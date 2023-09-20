import { useContext, useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, Text as RNText } from "react-native"
import { chatItemType } from "./types"
import Text from "../../Text"
import { WebSocketContext } from "../../../webSocketContextContainer"
import { Image } from "expo-image"
import typogrphy from "../../../theme/font"
import { NavigationContainerProps, useNavigation } from "@react-navigation/native"
import { MainStackParams, RootStackParamsType } from "../../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated from "react-native-reanimated"
import { OtherUserType } from "../../../types"
import { useSelector } from "react-redux"
import { RootState } from "../../../store"
import { getTimeForMessage } from "../../RoomScreen/utils"
import { SortOtherUserChat } from "../../../reducers/utils"




const ListChats = () => {

    const socket = useContext(WebSocketContext)
    const otherUsers = useSelector<RootState, OtherUserType[]>(state => state.chat.users)
    const [len, setLen] = useState([])
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParams, "home">>()

    const itemClicked = (username: string) => {

        navigation.navigate("room", { username })

    }

    const renderItem = ({ item, index }: { item: OtherUserType, index: number }) => {

        if (item.chats.length === 0) return null
        return (
            <ChatListItem item={item} onPress={() => itemClicked(item.username)} />
        )
    }
    return (
        <FlatList
            style={{ width: "100%" }}
            data={otherUsers}
            renderItem={renderItem}
            keyExtractor={(item: OtherUserType) => "chat-" + item.username}
        />
    )
}

const ChatListItem = ({ item, onPress }: { item: OtherUserType, onPress: () => void }) => {

    console.error(item.chats[0]?.message);

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
                        {item.firstname} {item.lastname}
                    </Text>
                    <Text
                        style={{
                            fontSize: typogrphy.fontSize.sm,
                            color: "#888",
                            alignSelf: 'flex-end'
                        }}>
                        {getTimeForMessage(item.chats[0].date)}
                    </Text>
                </View>

                <Text
                    style={{
                        fontSize: typogrphy.fontSize.sm,
                        color: "#555",
                        lineHeight: 25,
                        maxHeight: 25
                    }}>
                    {item.chats[0]?.message}
                </Text>
            </View>



        </TouchableOpacity>
    )
}

export default ListChats