import { useState } from "react"
import { FlatList, View } from "react-native"
import { chatsType } from "./types"
import Text from "../../Text"





const ListChats = () => {

    const [chats, setChats] = useState<chatsType[]>([])
    const [len, setLen] = useState([])

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