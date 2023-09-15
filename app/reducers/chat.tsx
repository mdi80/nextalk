import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

import { OtherUserType } from "../types"
import { logoutCurrentUser } from "./auth"
import { getUserInfo } from "../apis/verification"


export const sendMessageThunk = createAsyncThunk<void, { message: string, socket: WebSocket | null, username: string }, { state: RootState }>(
    'chat/sendMessageThunk',
    async ({ message, socket, username }, { getState, dispatch }) => {
        const currentUsername = getState().auth.username
        if (!currentUsername) {
            dispatch(logoutCurrentUser())
            return
        }
        const messageId = `${username}-${new Date().getTime()}`
        dispatch(addMessage({ from: currentUsername, message, username, id: messageId }))
        console.log("send: " + JSON.stringify({
            type: "send_message",
            message,
            username,
            messageId
        }));

        socket?.send(JSON.stringify({
            type: "send_message",
            message,
            username,
            messageId
        }))


    }
)



export const confrimMessageThunk = createAsyncThunk<void, { id: string, newId: string }, { state: RootState }>(
    'chat/confrimMessageThunk',
    async ({ id, newId }, { getState, dispatch }) => {

        const currentUsername = getState().auth.username
        if (!currentUsername) {
            dispatch(logoutCurrentUser())
            return
        }



        dispatch(confirmMessage({ id, newId }))
        //TODO update in db
    }
)




export const newMessageThunk = createAsyncThunk<void, { id: number, message: string, from: string, date: number }, { state: RootState }>(
    'chat/newMessageThunk',
    async (data, { getState, dispatch }) => {

        const { username: currentUsername, token } = getState().auth

        if (!currentUsername || !token) {
            dispatch(logoutCurrentUser())
            return
        }
        console.log("newMessage: " + JSON.stringify(data));


        const user = getState().chat.users.find(user => user.username === data.from)
        if (user) {
            dispatch(newMessage({ ...data, currentUsername }))
        } else {


            getUserInfo(data.from, token).then(res => {
                console.log(res);

                dispatch(newUser(res))
                dispatch(newMessage({ ...data, currentUsername }))
            })
        }


        //TODO update in db
    }
)


type chatSliceStateType = {
    users: OtherUserType[]
}

const initialState: chatSliceStateType = {
    users:
        [
            // { firstname: "Mahdi", lastname: "n", username: 'mdi20', imagePath: "", phone: "+98932432432", lastActiveDateTime: "19:02", chats: [] },
            // { firstname: "Mahdi", lastname: "nzasd", username: 'mdi80', imagePath: "", phone: "+98932432432", lastActiveDateTime: "19:02", chats: [] },
        ]
}



const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage(state: chatSliceStateType, action: PayloadAction<{ from: string, id: string, username: string, message: string }>) {

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

        },
        confirmMessage(state: chatSliceStateType, action: PayloadAction<{ id: string, newId: string }>) {
            const username = action.payload.id.split("-")[0]


            const chat = state.users.find(item => item.username === username)?.chats.find(chat => chat.id === action.payload.id)
            if (!chat) return
            chat.id = action.payload.newId
            chat.saved = true

        },
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
        },
        newUser(state: chatSliceStateType, action: PayloadAction<OtherUserType>) {
            state.users = [action.payload, ...state.users]
        }

    }
})


export const { addMessage, confirmMessage, newMessage, newUser } = chatSlice.actions
export default chatSlice.reducer