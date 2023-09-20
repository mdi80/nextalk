import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, logoutCurrentUser, setUserInfo } from "./auth"
import { IUserInfo, deleteUser } from "../db/auth-service"
import { changeAccountInStorage, getAllUsersFromStorage } from "../db/auth-apis"
import { WEB_SOCKET_URL } from "../config"
import { RootState } from "../store"
import { getTicket } from "../apis/ws"
import { deleteAllChats, loadChatsFromStorageThunk } from "./chat"



//TODO Test this function runs twice if give some delay to api
export const getTicketWithToken = createAsyncThunk<string, void, { state: RootState }>(
    'app/getticket',
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {

            const status = getState().app.ws_status
            const token = getState().auth.token

            if (!token)
                return rejectWithValue(-1);

            const ticket = await getTicket(token)
            if (typeof (ticket) === 'number') {
                if (ticket === 401) {

                    dispatch(logoutCurrentUser())
                    return rejectWithValue(-5);
                }
                return rejectWithValue(-4);
            }
            if (!ticket) return rejectWithValue(-2);

            return ticket

        } catch {
            return rejectWithValue(-3);
        }
    }
)




export const loadUsersData = createAsyncThunk<{ user: IUserInfo | null, users: IUserInfo[] }, void, { state: RootState }>(
    'app/loadUsersData',
    async (_, { getState, dispatch }) => {
        const payload: { user: IUserInfo | null, users: IUserInfo[] } = { user: null, users: [] }
        payload.users = await getAllUsersFromStorage()

        payload.users.forEach(user => {
            if (user.lastactive) {
                payload.user = user
            }
        });
        console.log(payload.user);

        console.log("loadusers");
        dispatch(setUserInfo(payload.user))

        return payload
    }
)

type changeAccountProps = { phoneNumber: string }
export const changeAccount = createAsyncThunk<{ user: IUserInfo | null, users: IUserInfo[] }, changeAccountProps, { state: RootState }>(
    'app/chnageAccount',
    async ({ phoneNumber }: changeAccountProps, { getState, dispatch }) => {
        const payload: { user: IUserInfo | null, users: IUserInfo[] } = { user: null, users: [] }

        payload.users = await changeAccountInStorage(phoneNumber)
        payload.users.forEach(user => {
            if (user.lastactive) {
                payload.user = user
            }
        });
        dispatch(deleteAllChats())
        dispatch(setUserInfo(payload.user))
        await dispatch(loadChatsFromStorageThunk())
        // dispatch(setWebsocketStatus("init"))
        return payload

    }
)



export type ws_status = "init" | "start" | "connecting" | "connected" | "faild"

export interface IAppState {
    ws_status: ws_status
    ticket: string | null
    allUsersInfo: IUserInfo[] | null
}

const initialState: IAppState = {
    ticket: null,
    ws_status: "init",
    allUsersInfo: null
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAllUsers(state: IAppState, action: PayloadAction<IUserInfo[] | null>) {
            state.allUsersInfo = action.payload
        },
        setWebsocketStatus(state: IAppState, action: PayloadAction<ws_status>) {
            state.ws_status = action.payload
        },
        restartSocketValues(state: IAppState) {
            state.ws_status = "start"
            state.ticket = null
        }
    },
    extraReducers: builder => {
        builder.addCase(loadUsersData.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })
        builder.addCase(changeAccount.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })
        builder.addCase(getTicketWithToken.fulfilled, (state, action) => {
            state.ticket = action.payload
            state.ws_status = "connecting"
        })
        builder.addCase(getTicketWithToken.rejected, (state, action) => {
            if (action.payload === -5) {//invlid token
                //TODO logut the user from device and change active user 
                console.log('here');


            }
            state.ws_status = "init"
            state.ticket = null
        })

    }
})


export const { setAllUsers, setWebsocketStatus, restartSocketValues } = appSlice.actions
export default appSlice.reducer