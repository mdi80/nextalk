import { useNavigation } from "@react-navigation/native"
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import useTheme from "../../theme"
import colors from "../../theme/colors"
import typogrphy from "../../theme/font"
import Text from "../Text"
import { Image } from "expo-image"
import Animated from "react-native-reanimated"
import { getDateFromTimeStampForLastSeen } from "./utils"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

export type SimpleHeader = {
    name: string
    username: string
    lastseen: number | "online"
}
export default function RoomHeader({ name, username, lastseen }: SimpleHeader) {

    const navigation = useNavigation()

    const { colorScheme } = useTheme()
    const back = () => {
        navigation.goBack()
    }

    const currentUsername = useSelector<RootState, string | null>(state => state.auth.username)


    return (
        <View style={{
            ...styles.container, backgroundColor: colorScheme === "light" ? colors.primary : colors.dark.secondBacground
        }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={back}
                    activeOpacity={0.9}>

                    <Ionicons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
                {/* <Animated.View sharedTransitionTag={"chat-profile-" + username}> */}
                {currentUsername === username ?

                    <View style={{
                        marginHorizontal: 10,
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#36f9c5",
                        alignItems: 'center',
                        justifyContent: "center",
                        overflow: 'hidden'
                    }}>
                        <FontAwesome name="bookmark-o" size={25} color="white" />
                    </View>
                    :
                    <Image
                        source={require("../../assets/1_main.jpg")}
                        style={{
                            marginHorizontal: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2
                        }} />
                }
                <View>

                    <Text style={styles.mainTitle}>
                        {currentUsername === username ? "Saved Messages" : name}
                    </Text>
                    {currentUsername !== username &&
                        (
                            lastseen === "online" ?
                                <Text style={styles.subTitle}>
                                    online
                                </Text>

                                :
                                <Text style={styles.subTitle}>
                                    {getDateFromTimeStampForLastSeen(lastseen)}
                                </Text>
                        )
                    }
                </View>
            </View>

        </View >
    )
}



const innerPadding = 20

const styles = StyleSheet.create({

    container: {
        padding: innerPadding,
        paddingTop: (StatusBar.currentHeight ? StatusBar.currentHeight + innerPadding : 2 * innerPadding),
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        justifyContent: 'space-between',
    },
    mainTitle: {
        color: 'white',
        fontSize: typogrphy.fontSize.m,
        marginLeft: 20,
    },
    subTitle: {
        color: "#ccc",
        fontSize: typogrphy.fontSize.sm,
        marginLeft: 20,
    }
})
