import { View } from "react-native"
import Text from "../Text"
import colors from "../../theme/colors"
import typogrphy from "../../theme/font"
import Octicons from "react-native-vector-icons/Octicons"
import Ionicons from "react-native-vector-icons/Ionicons"


type ChatItemProps = {
    message: string
    time: string
    self: boolean
    sendToServer?: boolean
    seen?: boolean
}

const ChatItem = ({ message, self, time, seen, sendToServer }: ChatItemProps) => {

    return (

        <View
            style={{ alignSelf: self ? 'flex-end' : 'flex-start' }}>

            <View
                style={{
                    backgroundColor: self ? colors.secondry : "white",
                    borderRadius: 10,
                    margin: 5,
                    maxWidth: "85%",
                    minWidth: "20%",
                    padding: 10,
                    elevation: 1,
                }}>
                <Text style={{
                    fontSize: typogrphy.fontSize.sm,
                }}>
                    {message}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    alignItems: 'center'
                }}>

                    <Text
                        style={{
                            fontSize: typogrphy.fontSize.xsm,
                            color: "#888",
                            marginRight: 2
                        }}>
                        {time}
                    </Text>
                    {!sendToServer ?
                        <Octicons name="clock" />
                        :
                        !seen ?
                            <Ionicons name="checkmark" size={14} color={colors.primary} />
                            :
                            <Ionicons name="checkmark-done" size={14} color={colors.primary} />

                    }
                </View>

            </View>
        </View>
    )
}

export default ChatItem