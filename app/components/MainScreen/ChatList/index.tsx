import { useContext, useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { chatItemType } from "./types"
import Text from "../../Text"
import { WebSocketContext } from "../../../webSocketContextContainer"
import { Image } from "expo-image"
import typogrphy from "../../../theme/font"
import { NavigationContainerProps, useNavigation } from "@react-navigation/native"
import { MainStackParams, RootStackParamsType } from "../../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"




const ListChats = () => {

    const socket = useContext(WebSocketContext)
    const [chats, setChats] = useState<chatItemType[]>([
        { from: "Mahdi", username: 'mdi80', imageUrl: "", lastmessage: "Hello!", latestConnect: "19:02" },
        { from: "Mahdi", username: 'mdi10', imageUrl: "", latestConnect: "Thu", lastmessage: "Where Are gfdgd dfgfdg dfgfdg  dfdfd fdg dg gfdgfd dfg  dfg  you?" },
    ])
    const [len, setLen] = useState([])
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParams, "home">>()


    useEffect(() => {

        if (socket) {
            socket.onmessage = (message) => {

            }
        }

    }, [socket])


    const itemClicked = (username: string) => {

        navigation.navigate("room", { username })

    }

    const renderItem = ({ item, index }: { item: chatItemType, index: number }) => {



        return (
            <ChatListItem item={item} onPress={() => itemClicked(item.username)} />
        )
    }
    return (
        <FlatList
            style={{ width: "100%" }}
            data={chats}
            renderItem={renderItem}
            keyExtractor={(item: chatItemType) => "chat-" + item.username}
        />
    )
}

const ChatListItem = ({ item, onPress }: { item: chatItemType, onPress: () => void }) => {



    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={{
                width: "100%",
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>

            <Image
                source={require("../../../assets/1_main.jpg")}
                style={{
                    marginHorizontal: 10,
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2
                }} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Text>
                        {item.from}
                    </Text>

                    <Text
                        style={{
                            fontSize: typogrphy.fontSize.sm,
                            color: "#888",
                            alignSelf: 'flex-end'
                        }}>
                        {item.latestConnect}
                    </Text>
                </View>

                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        fontSize: typogrphy.fontSize.sm,
                        color: "#555"
                    }}>
                    {item.lastmessage}
                </Text>
            </View>



        </TouchableOpacity>
    )
}

export default ListChats