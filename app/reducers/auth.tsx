import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const initialState = {
    username: null,
    name: null,
    email: null,
    token: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {

        },
        logout(state, action: PayloadAction<string>) {

        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer