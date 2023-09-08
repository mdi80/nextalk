import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { logoutToken } from "../apis/auth"
import { IUserInfo } from "../db/service"
import { RootState } from "../store"
import { deleteUserFromFromStorage } from "../db/apis"
import { loadUsersData } from "./app"


type logOutProps = {}
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