import React, { JSX } from "react"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { DotIndicator } from "react-native-indicators"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../reducers/auth"
import { RootState } from "../../store"
import Animated from "react-native-reanimated"
import styles from "../intro/styles"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParams, RootStackParamsType } from "../../navigator/types"
import { RouteProp } from "@react-navigation/native"



type Props = {
    navigation: NativeStackNavigationProp<AuthStackParams, 'auth_intro'>
};

function IntroAuthScreen({ navigation }: Props): JSX.Element {

    const [timerFinished, setTimerFinshed] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => { setTimerFinshed(true) }, 1000)
    }, [])

    React.useEffect(() => {
        if (timerFinished) {

            navigation.navigate("phone")

        }
    }, [timerFinished])


    return (
        <Container style={styles.container}>
            <AppStatusBar translucent forcelight />

            <Animated.View
                sharedTransitionTag="intro">
                <FontAwesome name="send-o" color="white" size={100} />
            </Animated.View>

        </Container>

    )
}


export default IntroAuthScreen