import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/auth-service"
import { RootState } from "../store"
import { deleteUserFromFromStorage } from "../db/auth-apis"
import { loadUsersData } from "./app"

import { ChatType, OtherUserType } from "../types"
import { logoutCurrentUser } from "./auth"


export const sendMessage = createAsyncThunk<void, { message: string, socket: WebSocket | null, username: string }, { state: RootState }>(
    'chat/sendmessage',
    async ({ message, socket, username }, { getState, dispatch }) => {
        const currentUsername = getState().auth.username
        if (!currentUsername) {
            dispatch(logoutCurrentUser())
            return
        }
        const messageId = `${username}-${new Date().getTime()}`
        dispatch(addMessage({ from: currentUsername, message, username, id: messageId }))
        socket?.send(JSON.stringify({
            type: "send_message",
            message,
            username,
            messageId
        }))
        console.log("here");


    }
)

type chatSliceStateType = {
    users: OtherUserType[]
}

const initialState: chatSliceStateType = {
    users:
        [
            { firstname: "Mahdi", lastname: "n", username: 'mdi20', imagePath: "", phone: "+98932432432", lastActiveDateTime: "19:02", chats: [] },
            { firstname: "Mahdi", lastname: "nzasd", username: 'mdi80', imagePath: "", phone: "+98932432432", lastActiveDateTime: "19:02", chats: [] },
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
                    send: false,
                }]

        },
    }
})


export const { addMessage } = chatSlice.actions
export default chatSlice.reducer