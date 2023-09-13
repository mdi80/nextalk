import { useNavigation } from "@react-navigation/native"
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import useTheme from "../../theme"
import colors from "../../theme/colors"
import typogrphy from "../../theme/font"
import Text from "../Text"
import { Image } from "expo-image"

export type SimpleHeader = {
    name: string
}
export default function RoomHeader({ name }: SimpleHeader) {

    const navigation = useNavigation()

    const { colorScheme } = useTheme()
    const back = () => {
        navigation.goBack()
    }




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

                <Image
                    source={require("../../assets/1_main.jpg")}
                    style={{
                        marginHorizontal: 10,
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2
                    }} />
                <View>
                    <Text style={styles.mainTitle}>
                        {name}
                    </Text>
                    <Text style={styles.subTitle}>
                        last seen at 19:08
                    </Text>
                </View>
            </View>

        </View >
    )
}



const innerPadding = 20

const styles = StyleSheet.create({

    container: {
        padding: innerPadding,
        paddingTop: (StatusBar.currentHeight ? StatusBar.currentHeight : innerPadding),
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
