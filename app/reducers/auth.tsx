import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/auth-service"
import { RootState } from "../store"
import { deleteUserFromFromStorage } from "../db/auth-apis"
import { loadUsersData } from "./app"

export const logoutCurrentUser = createAsyncThunk<void, void, { state: RootState }>(
    'auth/logout',
    async (_, { getState, dispatch }) => {

        const token = getState().auth.token
        if (!token) return

        await deleteUserFromFromStorage(token).catch(e => {
            console.error("couldn't delete user from db! message: " + e.message)
            return
        })
        await dispatch(loadUsersData())

        //     payload.users = await
        //         payload.users.forEach(user => {
        //             if (user.lastactive) {
        //                 payload.user = user
        //             }
        //         });

        // dispatch(setUserInfo(payload.user))
        // dispatch(setWebsocketStatus("init"))

    }
)
export interface IUserState {
    phone: string | null
    firstname: string | null
    lastname: string | null
    token: string | null
    username: string | null 

}

const initialState: IUserState = {
    phone: null,
    firstname: null,
    lastname: null,
    token: null,
    username: null,
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
                state.username = action.payload.username 
            } else {
                state.phone = null
                state.token = null
                state.firstname = null
                state.lastname = null
                state.username = null
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