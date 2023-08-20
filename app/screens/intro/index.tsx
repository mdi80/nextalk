import { JSX } from "react"
import { SafeAreaView, Text, StatusBar, ActivityIndicator } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import styles from "./styles"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import colors from "../../theme/colors"
import useTheme from "../../theme"
import { DotIndicator } from "react-native-indicators"


function IntroScreen(): JSX.Element {

    



    return (
        <Container style={styles.container}>
            <AppStatusBar translucent forcelight />
            <FontAwesome name="send-o" color="white" size={100} />
            <DotIndicator
                size={10}
                color="white"
                style={{
                    position: 'absolute',
                    bottom: 50,
                }} />
        </Container>

    )
}


export default IntroScreen