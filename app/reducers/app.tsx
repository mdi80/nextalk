import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, setUserInfo } from "./auth"
import { IUserInfo } from "../db/service"
import { changeAccountInStorage, getAllUsersFromStorage } from "../db/apis"
import { WEB_SOCKET_URL } from "../config"
import { RootState } from "../store"
import { getTicket } from "../apis/ws"

export const getTicketWithToken = createAsyncThunk<string, void, { state: RootState }>(
    'app/getticket',
    async (_, { getState, rejectWithValue }) => {
        try {
            console.log('starting');

            const status = getState().app.ws_status
            const token = getState().auth.token

            if (!token)
                return rejectWithValue(-1);

            const ticket = await getTicket(token)

            if (!ticket) return rejectWithValue(-2);

            return ticket

        } catch {
            return rejectWithValue(-3);
        }
    }
)


export const connectWebSocketWithTicket = createAsyncThunk<WebSocket, void, { state: RootState }>(
    'app/connect',
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {
            const status = getState().app.ws_status
            const ticket = getState().app.ticket

            if (!ticket)
                return rejectWithValue(-1);


            const socket = new WebSocket(WEB_SOCKET_URL + "ws/chat/connect/?" + ticket)
            socket.onerror = (error) => {
                dispatch(setWebsocketStatus("faild"))
            }
            socket.onopen = () => {
                dispatch(setWebsocketStatus("connected"))
            }
            socket.onclose = () => {
                dispatch(setWebsocketStatus("faild"))
            }
            return socket
        } catch {

            return rejectWithValue(-2);
        }
    }
)



export const loadUsersData = createAsyncThunk(
    'app/loadUsersData',
    async (_, { getState, dispatch }) => {
        const payload: { user: IUserInfo | null, users: IUserInfo[] } = { user: null, users: [] }
        payload.users = await getAllUsersFromStorage()

        payload.users.forEach(user => {
            if (user.lastactive) {
                payload.user = user
            }
        });

        dispatch(setUserInfo(payload.user))

        return payload
    }
)

type changeAccountProps = { phoneNumber: string }
export const changeAccount = createAsyncThunk(
    'app/chnageAccount',
    async ({ phoneNumber }: changeAccountProps, { getState, dispatch }) => {
        const payload: { user: IUserInfo | null, users: IUserInfo[] } = { user: null, users: [] }

        payload.users = await changeAccountInStorage(phoneNumber)
        payload.users.forEach(user => {
            if (user.lastactive) {
                payload.user = user
            }
        });

        dispatch(setUserInfo(payload.user))

        return payload

    }
)

export type ws_status = "start" | "connecting" | "connected" | "faild"

export interface IAppState {
    wsocket: WebSocket | null
    ws_status: ws_status
    ticket: string | null
    allUsersInfo: IUserInfo[] | null
}

const initialState: IAppState = {
    wsocket: null,
    ticket: null,
    ws_status: "start",
    allUsersInfo: null
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAllUsers(state: IAppState, action: PayloadAction<IUserInfo[] | null>) {
            state.allUsersInfo = action.payload
        },
        closeSocket(state: IAppState, action: PayloadAction<undefined>) {
            state.wsocket?.close()
            state.wsocket = null
        },
        setWebsocketStatus(state: IAppState, action: PayloadAction<ws_status>) {
            state.ws_status = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(loadUsersData.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })
        builder.addCase(changeAccount.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })
        builder.addCase(connectWebSocketWithTicket.fulfilled, (state, action) => {
            state.wsocket = action.payload
        })
        builder.addCase(connectWebSocketWithTicket.rejected, (state, action) => {
            state.ws_status = "start"
            state.ticket = null
            state.wsocket = null
        })
        builder.addCase(getTicketWithToken.fulfilled, (state, action) => {
            state.ticket = action.payload
            state.ws_status = "connecting"
        })
        builder.addCase(getTicketWithToken.rejected, (state, action) => {
            state.ws_status = "start"
            state.ticket = null
            state.wsocket = null
        })

    }
})


export const { setAllUsers, closeSocket, setWebsocketStatus } = appSlice.actions
export default appSlice.reducer