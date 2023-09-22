import { useContext, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


import { WebSocketContext } from '../../webSocketContextContainer'
import { AppDispatch, RootState } from '../../store'
import { ChatType } from '../../types'
import useTheme from '../../theme'
import ChatItem from './ChatListItem'
import { getDateOfMessage, isDatesInSameDay } from './utils'
import Text from '../Text'
import typogrphy from '../../theme/font'


const RoomChatList = ({ username }: { username: string }) => {

    const { colorScheme, colorText } = useTheme()
    const socket = useContext(WebSocketContext)
    const chats = useSelector<RootState, ChatType[] | undefined>(state => state.chat.users.find(item => item.username == username)?.chats)
    const dispatch = useDispatch<AppDispatch>()
    const currentUsername = useSelector<RootState, string | null>(state => state.auth.username)

    const saveMessage = (currentUsername === username)

    const renderItem = ({ item, index }: { item: ChatType, index: number }) => {
        //@ts-ignore
        const per = chats[index + 1]

        return (
            <>
                <ChatItem
                    seen={item.seen}
                    sendToServer={item.saved}
                    time={item.date}
                    message={item.message}
                    self={(saveMessage || item.from_user !== username)} />
                {per ?
                    !isDatesInSameDay(per.date, item.date) &&
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: typogrphy.fontSize.sm,
                            backgroundColor: '#bbbbbbaa',
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            color: 'white',
                        }}
                    >{getDateOfMessage(item.date)}</Text>
                    :

                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: typogrphy.fontSize.sm,
                            backgroundColor: '#bbbbbbaa',
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            color: 'white',
                        }}
                    >{getDateOfMessage(item.date)}</Text>

                }

            </>
        )
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