import React, { JSX } from "react"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { DotIndicator } from "react-native-indicators"
import { getAllUsersFromStorage, getUserFromStorage } from "../../db/auth-apis"
import { useDispatch, useSelector } from "react-redux"
import { PayloadAction } from "@reduxjs/toolkit"
import { setUserInfo } from "../../reducers/auth"
import { AppDispatch, RootState } from "../../store"
import { RootStackParamsType } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"
import colors from "../../theme/colors"
import { loadUsersData, restartSocketValues, setAllUsers } from "../../reducers/app"
import { IUserInfo } from "../../db/auth-service"
import { loadChatsFromStorageThunk } from "../../reducers/chat"
import { Image } from "expo-image"
type navigationType = NativeStackNavigationProp<RootStackParamsType, 'intro'>
type Props = {
    navigation: navigationType
};



function IntroScreen({ navigation }: Props): JSX.Element {

    const [timerFinished, setTimerFinshed] = React.useState(false)
    const [userLoading, setUserLoading] = React.useState(true)

    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector<RootState, string | null>((state) => state.auth.token)

    React.useEffect(() => {
        setTimeout(() => { setTimerFinshed(true) }, 1000)
        dispatch(loadUsersData()).then(() => {
            return dispatch(loadChatsFromStorageThunk())
        }).finally(() => {
            dispatch(restartSocketValues())
            setUserLoading(false)
        })

    }, [])

    React.useEffect(() => {
        if (timerFinished && !userLoading) {
            if (!token) {
                navigation.replace("auth", { screen: 'auth_intro' })
            }
        }
    }, [timerFinished, userLoading])


    return (
        <Container style={styles.container}>
            <AppStatusBar translucent forcelight />

            <Image source={require("../../assets/send-white.png")} style={{ width: 100, height: 100 }} />
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



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',

    }

})


export type { navigationType }

export default IntroScreen