import { View } from "react-native"
import useTheme from "../../../theme"
import { Image } from "expo-image"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ProfilesList from "./ProfilesList"
import { drawerHeaderStyles } from "./styles"


export default function DrawerHeader() {
    const { colorScheme } = useTheme()
    const imageSize = 70

    return (
        <>
            <View style={drawerHeaderStyles(colorScheme).headerDrawerContainer}>

                <View style={drawerHeaderStyles(colorScheme).headerDrawerContent}>
                    <Image
                        source={require("../../../assets/1_main.jpg")}
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

