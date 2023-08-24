import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/service"


export interface TUserState {
    phone: string | null
    firstname: string | null
    lastname: string | null
    token: string | null
    username: string | null | undefined
    already_register: boolean
}

const initialState: TUserState = {
    phone: null,
    firstname: null,
    lastname: null,
    token: null,
    username: undefined,
    already_register: false,
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state: TUserState, action: PayloadAction<IUserInfo>) {
            state.phone = action.payload.phone
            state.token = action.payload.token
            state.firstname = action.payload.first_name
            state.lastname = action.payload.last_name
            state.username = action.payload.username ? action.payload.username : null

        },

        login(state: TUserState, action: PayloadAction<string>) {

        },
        logout(state: TUserState) {
            logoutToken(state.token)
            state = initialState
        }
    }
})


export const { login, logout, setUserInfo } = authSlice.actions
export default authSlice.reducer