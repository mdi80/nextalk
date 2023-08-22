import React, { JSX, useEffect, useRef, useState } from "react"
import { SafeAreaView, Text, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import CodeInput from "react-native-confirmation-code-input"
import colors from "../../theme/colors"
import typogrphy from "../../theme/font"
import useTheme from "../../theme"
import Animated from "react-native-reanimated"


function InsertCodeVerify(): JSX.Element {

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
                flex: 1
            }}
        >
            <AppStatusBar />

            <Animated.View sharedTransitionTag="intro">
                <FontAwesome name="send-o" color={colors.primary} size={100} />
            </Animated.View>
            {/* <View
                style={{
                    height: 300,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                <FontAwesome name="send-o" color={colors.primary} size={100} />
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontSize: typogrphy.fontSize.sm, color: "red", marginBottom: 10 }}>
                        {error}
                    </Text>


                </View>

            </View> */}

        </Container>

    )
}


export default InsertCodeVerify