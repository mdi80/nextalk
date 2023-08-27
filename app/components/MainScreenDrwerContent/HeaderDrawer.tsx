import { View } from "react-native"
import useTheme from "../../theme"
import colors from "../../theme/colors"
import { Image } from "expo-image"
import { StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ProfilesList from "./ProfilesList"
import styles from "./styles"


export default function DrawerHeader() {
    const { colorScheme } = useTheme()
    const imageSize = 70

    return (
        <>
            <View style={{
                ...styles.headerDrawerContainer,
                backgroundColor: colorScheme === "light" ? colors.primary : colors.dark.background
            }}>

                <View style={styles.headerDrawerContent}>
                    <Image
                        source={require("../../assets/1_main.jpg")}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            borderRadius: imageSize / 2
                        }} />
                    <FontAwesome name="send-o" color="white" size={25} />
                </View>

            </View>
            <ProfilesList />

        </>
    )
}

