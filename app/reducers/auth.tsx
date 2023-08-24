import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/service"

interface SetPhoneKeyPayloadType {
    phone_key: string
    firstname: string
    lastname: string

}

export interface TUserState {
    phone: string | null
    firstname: string | null
    lastname: string | null
    token: string | null
    username: string | null
    phone_key: string | null
    already_register: boolean
}

const initialState: TUserState = {
    phone: null,
    firstname: null,
    lastname: null,
    token: null,
    username: null,
    phone_key: null,
    already_register: false,
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setNewUserPhoneKey(state: TUserState, action: PayloadAction<string>) {
            state.phone_key = action.payload
            state.already_register = false
        },
        setUserPhoneKey(state: TUserState, action: PayloadAction<SetPhoneKeyPayloadType>) {
            state.phone_key = action.payload.phone_key
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.already_register = true

        },
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


export const { login, logout, setUserInfo, setNewUserPhoneKey, setUserPhoneKey } = authSlice.actions
export default authSlice.reducer