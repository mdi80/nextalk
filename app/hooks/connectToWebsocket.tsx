import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { getTicketWithToken, restartSocketValues, setWebsocketStatus, ws_status } from "../reducers/app"
import { WEB_SOCKET_URL } from "../config"
import { confrimMessageThunk, newMessageThunk, syncNewMessages } from "../reducers/chat"

const useConnectToWS = (socket: WebSocket | null, setSocket: (socket: WebSocket | null) => void) => {

    const token = useSelector<RootState, string | null>(state => state.auth.token)
    const ticket = useSelector<RootState, string | null>(state => state.app.ticket)
    const wsocket_status = useSelector<RootState, ws_status>(state => state.app.ws_status)
    const dispatch = useDispatch<AppDispatch>()


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
            const socket = new WebSocket(WEB_SOCKET_URL + "ws/chat/connect/?" + ticket)
            socket.onopen = () => {
                dispatch(setWebsocketStatus("connected"))
            }

            setSocket(socket)
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
            socket.onmessage = (mes: WebSocketMessageEvent) => {

                const type = JSON.parse(mes['data'])['type']
                const data = JSON.parse(mes['data'])['data']
                console.log(type);
                switch (type) {
                    case 'confirm-save-message':
                        dispatch(confrimMessageThunk(data))
                        // console.log(data);
                        break;
                    case 'sync_new_messages':
                        console.log(data);

                        dispatch(syncNewMessages(data)).then((action) => {
                            console.log("ack for " + JSON.stringify(action.payload));

                            socket.send(JSON.stringify({ type: "ack_message", data: action.payload }))
                        })
                        break;

                    case "new_message":
                        // console.log(data);
                        dispatch(newMessageThunk(data)).then(action => {
                            console.log("ack for " + JSON.stringify(action.payload));

                            socket.send(JSON.stringify({ type: "ack_message", data: action.payload }))
                        })
                        break;
                    default:
                        console.log("Unkown message from server!");
                        break;
                }

            }

        }
        if (wsocket_status === "faild") {//retry for now
            console.log('Socket: Faild');

            dispatch(restartSocketValues())
        }

    }, [wsocket_status])



    useEffect(() => {
        dispatch(setWebsocketStatus("init"))
    }, [token])


}

export default useConnectToWS