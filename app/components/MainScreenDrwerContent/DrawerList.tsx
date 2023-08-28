import { TouchableOpacity, View } from "react-native"
import Text from "../Text"
import { drawerBodyStyles } from "./styles"
import useTheme from "../../theme"
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Divider from "./Divider"
import { useNavigation } from "@react-navigation/native"
import { RootState } from "../../store"
import { MainStackParams } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const DrawerList = () => {
    const { colorScheme } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParams, 'home'>>()
    return (
        <View style={drawerBodyStyles(colorScheme).container}>
            <DrawerListItem antIcon="user" title="Contacts" onPress={() => navigation.navigate("contacts")} />
            <DrawerListItem antIcon="phone" title="Recnet Calls" onPress={() => navigation.navigate("recentCalls")} />
            <DrawerListItem fontIcon="bookmark-o" title="Saved Messages" onPress={() => navigation.navigate("saved")} />
            <DrawerListItem antIcon="setting" title="Settings" onPress={() => navigation.navigate("settings")} />
            <Divider scheme={colorScheme} />
            <DrawerListItem antIcon="adduser" title="Invite Firends" onPress={() => navigation.navigate("invite")} />
            <DrawerListItem antIcon="questioncircleo" title="Nextalk Features" onPress={() => navigation.navigate("features")} />

        </View>
    )
}

type DrawerListItem = {
    title: string
    antIcon?: string
    fontIcon?: string
    onPress: () => void
}
const DrawerListItem = ({ title, antIcon, fontIcon, onPress }: DrawerListItem) => {
    const { colorScheme, colorText } = useTheme()
    return (

        <TouchableOpacity
            onPress={onPress}
            style={drawerBodyStyles(colorScheme).btnItem}
            activeOpacity={0.9}>
            {antIcon && <AntDesign name={antIcon} size={20} color={colorText} />}
            {fontIcon && <FontAwesome name={fontIcon} size={20} color={colorText} />}
            <Text style={drawerBodyStyles(colorScheme).btnItemText}>
                {title}
            </Text>
        </TouchableOpacity>
    )

}



export default DrawerList