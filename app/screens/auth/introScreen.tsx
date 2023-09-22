import React, { JSX } from "react"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import Animated from "react-native-reanimated"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParams } from "../../navigator/types"
import colors from "../../theme/colors"
import { Image } from "expo-image"



type Props = {
    navigation: NativeStackNavigationProp<AuthStackParams, 'auth_intro'>
};

function IntroAuthScreen({ navigation }: Props): JSX.Element {

    const [timerFinished, setTimerFinshed] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => { setTimerFinshed(true) }, 500)
    }, [])

    React.useEffect(() => {
        if (timerFinished)
            navigation.navigate("phone", {})

    }, [timerFinished])


    return (
        <Container style={{
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <AppStatusBar translucent forcelight />

            <Animated.View sharedTransitionTag="logo">
                <Image source={require("../../assets/send-white.png")} style={{ width: 100, height: 100 }} />
            </Animated.View>

        </Container >

    )
}



export default IntroAuthScreen