import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, setUserInfo } from "./auth"
import { IUserInfo } from "../db/service"
import { getUsersFromStorage } from "../components/MainScreenDrwerContent/utils"





export const loadUsersData = createAsyncThunk(
    'app/loadUsersData',
    async (_, { getState, dispatch }) => {
        const payload: { user: IUserInfo | null, users: IUserInfo[] } = { user: null, users: [] }
        payload.users = await getUsersFromStorage()

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
    }
})


export const { setAllUsers } = appSlice.actions
export default appSlice.reducer