import React, { JSX, useRef, useState } from "react"
import { View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import colors from "../../theme/colors"
import useTheme from "../../theme"
import Animated from "react-native-reanimated"
import Text from "../../components/Text"
import { stylesLogin } from "./styles"


function LoginScreen(): JSX.Element {

    const { colorText } = useTheme()

    const codeInputRed = useRef(null)

    const [error, setError] = useState("")


    const onFulfill = (code: string) => {

    }

    return (
        <Container
            style={{
                justifyContent: "center",
                alignItems: 'center',
            }}>
            <AppStatusBar translucent />
            <View>
                <View
                    style={stylesLogin().contentContainer}>

                    <Animated.View sharedTransitionTag="intro">
                        <FontAwesome name="send-o" color={colors.primary} size={100} />
                    </Animated.View>
                    <Text>Welcome</Text>
                </View>



            </View>

        </Container>

    )
}


export default LoginScreen