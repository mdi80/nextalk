import { useContext, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


import { WebSocketContext } from '../../webSocketContextContainer'
import { AppDispatch, RootState } from '../../store'
import { ChatType } from '../../types'
import useTheme from '../../theme'
import ChatItem from './ChatListItem'


const RoomChatList = ({ username }: { username: string }) => {

    const { colorScheme, colorText } = useTheme()
    const socket = useContext(WebSocketContext)
    const chats = useSelector<RootState, ChatType[] | undefined>(state => state.chat.users.find(item => item.username == username)?.chats)
    const dispatch = useDispatch<AppDispatch>()
    const currentUsername = useSelector<RootState, string | null>(state => state.auth.username)

    const saveMessage = (currentUsername === username)

    const renderItem = ({ item }: { item: ChatType }) => {

        return <ChatItem
            seen={item.seen}
            sendToServer={item.saved}
            time={item.date}
            message={item.message}
            self={(saveMessage || item.from_user !== username)} />
    }

    return (
        <FlatList
            inverted
            data={chats}
            renderItem={renderItem}
            style={{
                flex: 1,
                // backgroundColor:
            }} />
    )
}


export default RoomChatList