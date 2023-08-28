import Container from "../screenContainer"
import styles from "./styles"
import useTheme from "../../theme"
import colors from "../../theme/colors"
import DrawerHeader from './HeaderDrawer'

const DrawerContent = () => {
    const { colorScheme } = useTheme()

    return (
        <Container style={{ ...styles.container, backgroundColor: colorScheme === "light" ? colors.light.background : colors.dark.secondBacground }}>
            <DrawerHeader />
        </Container>
    )
}


export default DrawerContent