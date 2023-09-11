import { useContext, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { chatsType } from "./types"
import Text from "../../Text"
import { WebSocketContext } from "../../../webSocketContextContainer"




const ListChats = () => {

    const socket = useContext(WebSocketContext)
    const [chats, setChats] = useState<chatsType[]>([])
    const [len, setLen] = useState([])

    useEffect(() => {

        if (socket) {
            socket.onmessage = (message) => {
                
            }
        }

    }, [socket])

    const renderItem = ({ item, index }: { item: chatsType, index: number }) => {
        return (
            <View>
                <Text>
                    {item.from}
                </Text>
            </View>
        )
    }
    return (
        <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={(item: chatsType) => "chat-" + item.id}
        />
    )
}

export default ListChats