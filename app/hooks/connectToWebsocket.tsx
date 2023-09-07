import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import { closeSocket, connectWebSocketWithTicket, getTicketWithToken, setWebsocketStatus, ws_status } from "../reducers/app"



const useConnectToWS = () => {


    const token = useSelector<RootState, string | null>(state => state.auth.token)
    const wsocket = useSelector<RootState, WebSocket | null>(state => state.app.wsocket)
    const wsocket_status = useSelector<RootState, ws_status>(state => state.app.ws_status)
    const dispatch = useDispatch<AppDispatch>()



    useEffect(() => {

        if (!token) return
        console.log('here');
        if (wsocket_status === "start") {
            console.log('start');

            dispatch(closeSocket())
            dispatch(getTicketWithToken())
        }
        if (wsocket_status === "connecting") {
            console.log('connecting');

            dispatch(connectWebSocketWithTicket())
        }
        if (wsocket_status === "connected") {
            console.log('connected');

            if (!wsocket) {
                dispatch(setWebsocketStatus("start"))
                return
            }
            wsocket.onmessage = (message) => {
                console.log("message from server")
            }
        }
        if (wsocket_status === "faild") {//retry for now
            console.log('faild');

            dispatch(setWebsocketStatus("start"))
        }

    }, [wsocket_status])




    useEffect(() => {

        dispatch(closeSocket())
        dispatch(setWebsocketStatus("start"))
        dispatch(getTicketWithToken())

    }, [token])


}

export default useConnectToWS