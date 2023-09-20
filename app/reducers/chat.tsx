import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

import { OtherUserType } from "../types"
import { logoutCurrentUser } from "./auth"
import { getUserInfo } from "../apis/verification"
import { addAllOtherUsersIfNotExists, addOtherUsersIfNotExists, getOtherUsersFromStorage } from "../db/users-apis"
import { loadChatsFromUsername } from "../db/chat-service"
import { confirmMessageInStorage, loadChatFromStorage, saveNewMessageReceive, saveNewMessageSend, syncNewMessagesReceive } from "../db/chat-apis"
import { getUsersInfo } from "../db/auth-service"
import { SortOtherUserChat } from "./utils"


export const loadChatsFromStorageThunk = createAsyncThunk<OtherUserType[], void, { state: RootState }>(
    'chat/loadOtherUsersThunk',
    async (_, { getState, dispatch }) => {

        const currentUsername = getState().auth.username
        const currentPhone = getState().auth.phone
        if (!currentUsername || !currentPhone) {
            dispatch(logoutCurrentUser())
            return []
        }

        const users: OtherUserType[] = []

        const db_users = await getOtherUsersFromStorage(currentUsername)

        await Promise.all(
            db_users.map(async item => {
                const chats = await loadChatFromStorage(item.username, currentPhone)

                users.push({
                    username: item.username,
                    phone: item.phone,
                    firstname: item.firstname,
                    lastname: item.lastname,
                    lastActiveDateTime: item.lastActiveDateTime,
                    imagePath: item.imagePath,
                    chats: chats,
                })
            })
        )


        return users
    }
)



export const sendMessageThunk = createAsyncThunk<
    { from: string, id: string, username: string, message: string },
    { message: string, socket: WebSocket | null, username: string },
    { state: RootState }>(
        'chat/sendMessageThunk',
        async ({ message, socket, username }, { getState, dispatch, rejectWithValue }) => {
            const currentUsername = getState().auth.username
            const currentPhone = getState().auth.phone
            if (!currentUsername || !currentPhone) {
                dispatch(logoutCurrentUser())
                return rejectWithValue("Logout!")
            }
            const messageId = `${username}-${new Date().getTime()}`
            const user = getState().chat.users.find(item => item.username === username)
            if (!user) {
                throw new Error("User dose not exists in store!")
            }

            await addOtherUsersIfNotExists(currentUsername, user)
            await saveNewMessageSend({
                from_user: currentUsername,
                message: message,
                reply: null,
                date: new Date().getTime() / 1000,
                to_user: username,
                id: messageId,
                saved: false,
                seen: false
            }, currentPhone)
            socket?.send(JSON.stringify({
                type: "send_message",
                data: {
                    message,
                    username,
                    messageId
                }
            }))
            return { from: currentUsername, message, username, id: messageId }
        }
    )



export const confrimMessageThunk = createAsyncThunk<{ id: string, newId: string }, { id: string, newId: string }, { state: RootState }>(
    'chat/confrimMessageThunk',
    async ({ id, newId }, { getState, dispatch, rejectWithValue }) => {

        const currentUsername = getState().auth.username
        if (!currentUsername) {
            dispatch(logoutCurrentUser())
            return rejectWithValue("Logout!")
        }

        await confirmMessageInStorage({ id, newId })
        console.log("confirm");

        return { id, newId }
    }
)

export const syncNewMessages = createAsyncThunk<number[], { to_user: string, id: number, from_username: string, message: string, date: number, attachedFile: string | null }[], { state: RootState }>(
    'chat/syncNewMessages',
    async (data, { getState, dispatch }) => {

        const { username: currentUsername, token } = getState().auth
        const currentPhone = getState().auth.phone

        if (!currentUsername || !currentPhone || !token) {
            dispatch(logoutCurrentUser())
            return []
        }

        const unkownUsernames: string[] = []
        const unkownUsers: OtherUserType[] = []

        data.forEach(chat => {

            const user = getState().chat.users.find(user => user.username === chat.from_username)

            if (user) {
                dispatch(newMessage({ date: chat.date, from: chat.from_username, id: chat.id, message: chat.message, currentUsername }))
                unkownUsers.push(user)
            } else {
                if (!unkownUsernames.find(i => i === chat.from_username))
                    unkownUsernames.push(chat.from_username)
            }

        });

        await getUserInfo(unkownUsernames, token).then(res => {

            res.forEach(user => {
                unkownUsers.push(user)
                dispatch(newUser(user))
                const chats = data.filter(chat => chat.from_username === user.username)
                chats.forEach(chat => {
                    dispatch(newMessage({ date: chat.date, from: chat.from_username, id: chat.id, message: chat.message, currentUsername }))
                });
            });
        })
        console.log("syncing: " + JSON.stringify(data));

        await addAllOtherUsersIfNotExists(currentUsername, unkownUsers)
        await syncNewMessagesReceive(data.map(item => {
            return {
                from_user: item.from_username,
                message: item.message,
                reply: null,
                date: item.date,
                to_user: currentUsername,
                id: "" + item.id,
                saved: true,
                seen: false
            }
        }), currentPhone)

        return data.map(item => item.id)
    }
)





export const newMessageThunk = createAsyncThunk<number[], { id: number, message: string, from: string, date: number }, { state: RootState }>(
    'chat/newMessageThunk',
    async (data, { getState, dispatch }) => {

        const { username: currentUsername, token } = getState().auth
        const currentPhone = getState().auth.phone

        if (!currentUsername || !token || !currentPhone) {
            dispatch(logoutCurrentUser())
            return []
        }
        console.log("newMessage: " + JSON.stringify(data));


        const user = getState().chat.users.find(user => user.username === data.from)
        if (user) {
            dispatch(newMessage({ ...data, currentUsername }))

            await addOtherUsersIfNotExists(currentUsername, user)
        } else {

            await getUserInfo([data.from], token).then(res => {
                dispatch(newUser(res[0]))
                dispatch(newMessage({ ...data, currentUsername }))
                return addOtherUsersIfNotExists(currentUsername, res[0])
            })

        }
        console.log(data);

        await saveNewMessageReceive({
            from_user: data.from,
            message: data.message,
            reply: null,
            date: data.date,
            to_user: currentUsername,
            id: "" + data.id,
            saved: true,
            seen: false
        }, currentPhone)

        return [data.id]
    }
)


type chatSliceStateType = {
    users: OtherUserType[]
}

const initialState: chatSliceStateType = {
    users: []
}



const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        newMessage(state: chatSliceStateType, action: PayloadAction<{ id: number, message: string, from: string, date: number, currentUsername: string }>) {
            const user = state.users.find(user => user.username === action.payload.from)

            if (user) {
                user.chats = [{
                    to_user: action.payload.currentUsername,
                    date: action.payload.date * 1000,
                    from_user: action.payload.from,
                    id: "" + action.payload.id,
                    message: action.payload.message,
                    reply: null,
                    seen: false,
                    saved: true,
                }, ...user.chats]
            } else {
                throw new Error("Unkown error: User not found!!!");
            }
            state.users = SortOtherUserChat(state.users)
        },
        newUser(state: chatSliceStateType, action: PayloadAction<OtherUserType>) {
            state.users = [action.payload, ...state.users]
            state.users = SortOtherUserChat(state.users)
        },
        deleteUser(state: chatSliceStateType, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user.username !== action.payload)
            state.users = SortOtherUserChat(state.users)
        },

        deleteAllChats(state: chatSliceStateType) {
            state.users = []
        },
    },
    extraReducers: builder => {
        builder.addCase(loadChatsFromStorageThunk.fulfilled, (state, action) => {
            state.users = SortOtherUserChat(action.payload)
        })
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {

            const user = state.users.find(item => item.username === action.payload.username)
            if (!user) {
                throw new Error("Unkown error: User not found!!!");
            } else
                user.chats = [{
                    to_user: user.username,
                    date: new Date().getTime(),
                    from_user: action.payload.from,
                    id: action.payload.id,
                    message: action.payload.message,
                    reply: null,
                    seen: false,
                    saved: false,
                }, ...user.chats]
            state.users = SortOtherUserChat(state.users)

        })
        builder.addCase(confrimMessageThunk.fulfilled, (state, action) => {
            const username = action.payload.id.split("-")[0]
            const chat = state.users.find(item => item.username === username)?.chats.find(c => c.id === action.payload.id)
            console.log(action.payload.id);
            console.log(JSON.stringify(state.users.find(item => item.username === username)?.chats));

            if (!chat) return
            chat.id = action.payload.newId
            chat.saved = true
        })
    }
})


export const { newMessage, newUser, deleteUser, deleteAllChats } = chatSlice.actions
export default chatSlice.reducer