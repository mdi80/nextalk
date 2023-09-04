import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Text from "../../Text";
import Ionicons from "react-native-vector-icons/Ionicons"
import useTheme from "../../../theme";
import colors from "../../../theme/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams, RootStackParamsType } from "../../../navigator/types";
interface paramsType {
    navigation: NativeStackNavigationProp<MainStackParams, 'home'>
    openDrawer: () => void
}


export default function MainHeader({ navigation, openDrawer }: paramsType) {

    const { colorScheme } = useTheme()

    return (
        <View style={{
            ...styles.container, backgroundColor: colorScheme === "light" ? colors.primary : colors.dark.secondBacground
        }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={openDrawer}
                    activeOpacity={0.9}>

                    <Ionicons name="menu" size={35} color="white" />
                </TouchableOpacity>

                <Text style={styles.mainTitle}>
                    Nextalk
                </Text>
            </View>
            <TouchableOpacity

                activeOpacity={0.9}>

                <Ionicons name="search" size={25} color="white" />
            </TouchableOpacity>

        </View >
    )
}