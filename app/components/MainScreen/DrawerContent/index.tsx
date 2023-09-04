import Container from "../../screenContainer"
import { drawerBodyStyles, drawerHeaderStyles } from "./styles"
import useTheme from "../../../theme"
import colors from "../../../theme/colors"
import DrawerHeader from './HeaderDrawer'

import { ScrollView } from "react-native"
import { View } from "react-native"
import Divider from "./Divider"
import DrawerList from "./DrawerList"

const DrawerContent = () => {
    const { colorScheme } = useTheme()

    return (
        <Container style={{
            backgroundColor: colorScheme === "light" ? colors.light.background : colors.dark.secondBacground
        }}>
            <ScrollView>

                <DrawerHeader />
                <Divider scheme={colorScheme} />
                <DrawerList />
            </ScrollView>
        </Container>
    )
}


export default DrawerContent