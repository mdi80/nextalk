import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUserState } from "./auth"
import { IUserInfo } from "../db/service"



export type statusType = "auth" | "init" | "login"



export interface IAppState {
    allUsersInfo: IUserInfo[] | undefined
}

const initialState: IAppState = {

    allUsersInfo: undefined
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAllUsers(state: IAppState, action: PayloadAction<IUserInfo[]>) {
            state.allUsersInfo = action.payload
        }
    }
})


export const { setAllUsers } = appSlice.actions
export default appSlice.reducer