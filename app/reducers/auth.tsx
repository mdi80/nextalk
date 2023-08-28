import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/service"


export interface IUserState {
    phone: string | null
    firstname: string | null
    lastname: string | null
    token: string | null
    username: string | null | undefined

}

const initialState: IUserState = {
    phone: null,
    firstname: null,
    lastname: null,
    token: null,
    username: undefined,
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state: IUserState, action: PayloadAction<IUserInfo | null>) {
            if (action.payload) {
                state.phone = action.payload.phone
                state.token = action.payload.token
                state.firstname = action.payload.firstname
                state.lastname = action.payload.lastname
                state.username = action.payload.username ? action.payload.username : null
            }
        },

        login(state: IUserState, action: PayloadAction<string>) {

        },
        logout(state: IUserState) {
            logoutToken(state.token)
            state = initialState
        }
    }
})


export const { login, logout, setUserInfo } = authSlice.actions
export default authSlice.reducer