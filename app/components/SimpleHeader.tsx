import { RootState } from "../store"
import useTheme from "../theme"
import Text from "./Text"
import { useNavigation } from "@react-navigation/native"
import Container from "./screenContainer"
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import colors from "../theme/colors"
import typogrphy from "../theme/font"

export type SimpleHeader = {
    title: string
}
export default function SimpleHeader({ title }: SimpleHeader) {

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

                <Text style={styles.mainTitle}>
                    {title}
                </Text>
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
        fontSize: typogrphy.fontSize.lg,
        marginLeft: 20,
        fontWeight: 'bold',
    }
})
