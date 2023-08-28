import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, setUserInfo } from "./auth"
import { IUserInfo } from "../db/service"
import { changeAccountInStorage, getAllUsersFromStorage } from "../db/apis"





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


export interface IAppState {

    allUsersInfo: IUserInfo[] | null
}

const initialState: IAppState = {

    allUsersInfo: null
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAllUsers(state: IAppState, action: PayloadAction<IUserInfo[] | null>) {
            state.allUsersInfo = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(loadUsersData.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })
        builder.addCase(changeAccount.fulfilled, (state, action) => {
            state.allUsersInfo = action.payload.users
        })

    }
})


export const { setAllUsers } = appSlice.actions
export default appSlice.reducer