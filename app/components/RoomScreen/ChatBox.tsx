import { View, TextInput, TouchableOpacity } from 'react-native'
import colors from '../../theme/colors'
import useTheme from '../../theme'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const RoomChatBox = () => {

    const { colorScheme, colorText } = useTheme()


    return (
        <View
            style={{
                // position: 'absolute',
                // bottom: 0, left: 0, right: 0,
                maxHeight: 100,
                height: 60,
                padding: 10,
                backgroundColor: colorScheme === "dark" ? colors.dark.secondBacground : "white",
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <TouchableOpacity >
                <FontAwesome5 name="camera" color={colorText} size={20} />

            </TouchableOpacity>

            <TextInput
                multiline
                placeholder='Message'
                placeholderTextColor="#888"
                style={{
                    maxHeight: 100,
                    flex: 1,
                    color: colorText,
                    marginHorizontal: 10,
                }} />
            <TouchableOpacity >
                <MaterialIcons
                    name="attach-file"
                    style={{ transform: [{ rotate: "45deg" }], marginHorizontal: 13 }}
                    color={colorText} size={22} />

            </TouchableOpacity>
            <TouchableOpacity >
                <FontAwesome5
                    name="microphone"
                    color={colorText} size={22} />

            </TouchableOpacity>
        </View>
    )
}


export default RoomChatBox