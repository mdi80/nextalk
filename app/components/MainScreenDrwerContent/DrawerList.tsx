import { TouchableOpacity, View } from "react-native"
import Text from "../Text"
import { drawerBodyStyles } from "./styles"
import useTheme from "../../theme"
import AntDesign from "react-native-vector-icons/AntDesign"
import Divider from "./Divider"

const DrawerList = () => {
    const { colorScheme } = useTheme()
    return (
        <View style={drawerBodyStyles(colorScheme).container}>
            <DrawerListItem antIcon="user" title="Contacts" />
            <DrawerListItem antIcon="phone" title="Recnet Calls" />
            <DrawerListItem antIcon="user" title="Saved Messages" />
            <DrawerListItem antIcon="setting" title="Settings" />
            <Divider scheme={colorScheme} />
            <DrawerListItem antIcon="adduser" title="Invite Firends" />
            <DrawerListItem antIcon="questioncircleo" title="Nextalk Features" />

        </View>
    )
}

type DrawerListItem = {
    title: string
    antIcon?: string
}
const DrawerListItem = ({ title, antIcon }: DrawerListItem) => {
    const { colorScheme, colorText } = useTheme()
    return (

        <TouchableOpacity
            style={drawerBodyStyles(colorScheme).btnItem}
            activeOpacity={0.9}>
            {antIcon && <AntDesign name={antIcon} size={20} color={colorText} />}
            <Text style={drawerBodyStyles(colorScheme).btnItemText}>
                {title}
            </Text>
        </TouchableOpacity>
    )

}



export default DrawerList