import React, { createContext, useState, ReactNode } from 'react'
import useConnectToWS from './hooks/connectToWebsocket'

const WebSocketContext = createContext<WebSocket | null>(null)

export { WebSocketContext }

export default ({ children }: { children: ReactNode }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null)
    useConnectToWS()

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    )
}
