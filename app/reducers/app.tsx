import { createSlice } from "@reduxjs/toolkit"



export type statusType = "auth" | "init" | "login"



export interface IAppState {
    status: statusType
}

const initialState: IAppState = {

    status: "init"
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {

    }
})


export const { } = appSlice.actions
export default appSlice.reducer