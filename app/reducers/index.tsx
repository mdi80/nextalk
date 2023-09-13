import { combineReducers } from "redux";
import auth from "./auth";
import app from "./app";
import chat from "./chat";

const rootReducer = combineReducers({
    auth: auth,
    app: app,
    chat: chat
})


export default rootReducer

