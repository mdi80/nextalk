import { View, TextInput, TouchableOpacity } from 'react-native'
import colors from '../../theme/colors'
import useTheme from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useContext, useState } from 'react'
import { WebSocketContext } from '../../webSocketContextContainer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { sendMessage } from '../../reducers/chat'
const RoomChatBox = ({ username }: { username: string }) => {

    const { colorScheme, colorText } = useTheme()
    const [message, setMessage] = useState("")
    const socket = useContext(WebSocketContext)
    const dispatch = useDispatch<AppDispatch>()
    const onSendMessage = () => {
        console.log(username);

        // socket?.send(JSON.stringify({ message, username: username }))
        setMessage("")
        
        dispatch(sendMessage({message,socket,username}))


    }


    return (
        <View
            style={{
                // position: 'absolute',
                // bottom: 0, left: 0, right: 0,
                maxHeight: 100,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: colorScheme === "dark" ? colors.dark.secondBacground : "white",
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
                <FontAwesome5 name="camera" color={colorText} size={20} />

            </TouchableOpacity>

            <TextInput
                multiline
                placeholder='Message'
                placeholderTextColor="#888"
                // onSubmitEditing={send}
                value={message}
                onChangeText={setMessage}
                style={{
                    maxHeight: 100,
                    flex: 1,
                    color: colorText,
                    marginHorizontal: 10,
                }} />
            {message === "" ?
                <>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
                        <MaterialIcons
                            name="attach-file"
                            style={{ transform: [{ rotate: "45deg" }], marginHorizontal: 13 }}
                            color={colorText} size={22} />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
                        <FontAwesome5
                            name="microphone"
                            color={colorText} size={22} />

                    </TouchableOpacity>
                </>
                :
                <TouchableOpacity onPress={onSendMessage}>
                    <Ionicons name="send" size={22} color={colors.primary} />
                </TouchableOpacity>
            }
        </View>
    )
}


export default RoomChatBox