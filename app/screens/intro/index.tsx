import React, { JSX } from "react"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import styles from "./styles"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { DotIndicator } from "react-native-indicators"
import { getUserFromStorage } from "./utils"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../reducers/auth"
import { RootState } from "../../store"
import Animated from "react-native-reanimated"
import { AuthStackParams, IntroScreenParmas, RootStackParamsType } from "../../navigator/types"
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import { AuthNavigator } from "../../navigator/stackNavigations"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type Props = {
    route: IntroScreenParmas
    navigation: NativeStackNavigationProp<RootStackParamsType, 'intro'>
};



function IntroScreen({ navigation }: Props): JSX.Element {

    const [timerFinished, setTimerFinshed] = React.useState(false)
    const [userLoading, setUserLoading] = React.useState(true)

    const dispatch = useDispatch()
    const token = useSelector<RootState, string | null>((state) => state.auth.token)

    React.useEffect(() => {
        setTimeout(() => { setTimerFinshed(true) }, 1000)
        getUserFromStorage().then(user => {
            if (user)
                dispatch(setUserInfo(user))
        }).finally(() => {
            setUserLoading(false)
        })
    }, [])

    React.useEffect(() => {
        if (timerFinished && !userLoading) {
            console.log(token);

            if (token) {
                navigation.replace("main", { home: undefined })
            } else {
                navigation.replace("auth", { auth_intro: undefined, phone: undefined, verifyphone: undefined })
            }
        }
    }, [timerFinished, userLoading])


    return (
        <Container style={styles.container}>
            <AppStatusBar translucent forcelight />

            <FontAwesome name="send-o" color="white" size={100} />
            {timerFinished && userLoading &&

                <DotIndicator
                    size={10}
                    color="white"
                    style={{
                        position: 'absolute',
                        bottom: 50,
                    }} />
            }

        </Container>

    )
}


export default IntroScreen