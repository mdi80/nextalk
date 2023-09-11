import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { getTicketWithToken, restartSocketValues, setWebsocketStatus, ws_status } from "../reducers/app"
import { WEB_SOCKET_URL } from "../config"

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
            socket.onerror = (error) => {
                dispatch(setWebsocketStatus("faild"))
            }
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
            // socket.onmessage = (message) => {
            //     console.log("message from server")
            // }
            
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