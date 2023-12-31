import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { getTicketWithToken, restartSocketValues, setWebsocketStatus, ws_status } from "../reducers/app"
import { WEB_SOCKET_URL } from "../config"
import { confrimMessageThunk, newMessageThunk, sendMessageThunk, sendUnsendMessages, syncNewMessages } from "../reducers/chat"
import { getUnsendMessagesFromStorage } from "../db/chat-apis"
import { IUserState } from "../reducers/auth"

const useConnectToWS = (socket: WebSocket | null, setSocket: (socket: WebSocket | null) => void) => {

    const { token, phone } = useSelector<RootState, IUserState>(state => state.auth)
    const ticket = useSelector<RootState, string | null>(state => state.app.ticket)
    const wsocket_status = useSelector<RootState, ws_status>(state => state.app.ws_status)
    const dispatch = useDispatch<AppDispatch>()

    const SocketOnMessageReceived = (mes: WebSocketMessageEvent) => {
        if (!socket) {
            dispatch(setWebsocketStatus("faild"))
            return
        }
        const type = JSON.parse(mes['data'])['type']
        const data = JSON.parse(mes['data'])['data']
        console.log(type);
        switch (type) {
            case 'confirm-save-message':
                dispatch(confrimMessageThunk(data))

                break;
            case 'sync_new_messages':
                console.log(data);

                dispatch(syncNewMessages(data)).then((action) => {
                    if (action.payload) {
                        socket.send(JSON.stringify({ type: "ack_message", data: action.payload }))
                        console.log("ack for " + JSON.stringify(action.payload));
                    } else
                        console.error("ack is undifined ");
                })
                break;

            case "new_message":
                dispatch(newMessageThunk(data)).then(action => {
                    if (action.payload) {
                        socket.send(JSON.stringify({ type: "ack_message", data: action.payload }))
                        console.log("ack for " + JSON.stringify(action.payload));
                    } else
                        console.error("ack is undifined ");
                })
                break;
            default:
                console.error("Unkown message from server!");
                break;
        }

    }

    const SocketOnOpenConnection = async () => {
        console.log("socket" + socket);
        dispatch(setWebsocketStatus("connected"))
        dispatch(sendUnsendMessages({ socket }))

    }

    useEffect(() => {

        if (!token) return
        if (wsocket_status === "init") {
            console.log('Socket: Init');

            dispatch(restartSocketValues())
        }

        if (wsocket_status === "start") {
            console.log('Socket: Start');

            socket?.close()
            setSocket(null)
            dispatch(getTicketWithToken())
        }
        if (wsocket_status === "connecting") {
            console.log('Socket: Connecting');
            if (!ticket) {
                dispatch(restartSocketValues())
            }
            setSocket(new WebSocket(WEB_SOCKET_URL + "ws/chat/connect/?" + ticket))

        }
        if (wsocket_status === "connected") {
            console.log('Socket: Connected');

            if (!socket) {
                dispatch(setWebsocketStatus("start"))
                return
            }
            socket.onerror = (error) => {
                dispatch(setWebsocketStatus("faild"))
            }
            socket.onclose = () => {
                dispatch(setWebsocketStatus("faild"))
            }
            socket.onmessage = SocketOnMessageReceived

        }
        if (wsocket_status === "faild") {//retry for now
            console.log('Socket: Faild');

            dispatch(restartSocketValues())
        }

    }, [wsocket_status])

    useEffect(() => {
        dispatch(setWebsocketStatus("init"))
    }, [token])

    useEffect(() => {
        if (socket) {
            socket.addEventListener("open", SocketOnOpenConnection)
        }
    }, [socket])

}




export default useConnectToWS