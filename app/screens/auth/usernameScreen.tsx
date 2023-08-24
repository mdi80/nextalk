import React, { JSX, useRef, useState } from "react"
import { Keyboard, StyleSheet, ToastAndroid, View, Modal } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar, HideStatusBar } from "../../components/StatusBar"
import colors from "../../theme/colors"
import useTheme from "../../theme"
import Animated from "react-native-reanimated"
import Text from "../../components/Text"
import { stylesLogin } from "./styles"
import { AuthStackParams, SignUpScreenProps } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import TextInput from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import type { RouteProp } from '@react-navigation/native';
import { DotIndicator } from "react-native-indicators"
import typogrphy from "../../theme/font"
import { BlurView } from "@react-native-community/blur"
import { login, signup } from "../../apis/auth"
import { addUser } from "../../db/service"
import { addUserToStorage } from "../intro/utils"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../../reducers/auth"
type Props = {
    route: RouteProp<AuthStackParams, 'setusername'>
    navigation: NativeStackNavigationProp<AuthStackParams, 'setusername'>
};

function AddUserNameScreen({ navigation, route }: Props): JSX.Element {

    if (!route.params.firstname || !route.params.lastname ||
        route.params.firstname === "" || route.params.lastname === ""
    ) {
        ToastAndroid.show("Please Enter first and last name!", ToastAndroid.SHORT)
        navigation.goBack()
    }

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const dispatch = useDispatch()

    const submit = () => {
        setLoading(true)
        if (username.trim() === "") {
            Keyboard.dismiss()
        }

        signup({
            first_name: route.params.firstname,
            last_name: route.params.lastname,
            phone_key: route.params.phone_token,
            userid: username === "" ? undefined : username
        }).then(suc => {
            if (suc) {
                return login(route.params.phone_token)
            } else {
                throw Error("Unkown error")
            }
        }).then(res => {
            if (res)
                return addUserToStorage({
                    token: res.token,
                    phone: res.user.phone,
                    username: res.user.userid == "null" ? undefined : res.user.userid,
                    first_name: res.user.first_name,
                    last_name: res.user.last_name,
                    lastactive: true,
                })
            else
                throw Error("Unkown error!!!")

        }).then(data => {
            if (data) {

                dispatch(setUserInfo({
                    phone: data.phone,
                    token: data.token,
                    // @ts-ignore
                    firstname: data.first_name,
                    lastname: data.last_name,
                    username: data.username,
                }))

                navigation.reset({
                    index: 0,
                    //@ts-ignore
                    routes: [{ name: 'main' }],
                })
            } else {
                throw Error("DB Error!!!!")
            }
        }).catch(e => {
            console.log(e.message)
        })
    }




    return (
        <Container
            style={{
                paddingTop: 30,
                padding: 30,
            }}>

            <AppStatusBar translucent />
            <View style={stylesLogin().contentContainer}>

                <TextInput style={{ marginVertical: 10, }} autoFocus placeholder="Username (optional)" value={username} onChangeText={setUsername} />
                <Text style={{ fontSize: typogrphy.fontSize.xsm }}>Should be unique. Letters, digits and @/./+/-/_ only</Text>

            </View>
            <Animated.View sharedTransitionTag="logo2"
                style={{
                    transform: [{ scale: 0.2 }],
                    position: 'absolute',
                    bottom: 10,
                    alignSelf: 'center'
                }}
            >
                <FontAwesome name="send-o" color={colors.primary} size={100} />
            </Animated.View>
            <Text style={{
                marginLeft: -30,
                color: "#888",
                fontSize: typogrphy.fontSize.xsm,
                position: 'absolute',
                bottom: 25,
                alignSelf: 'center'
            }}>
                Nextalk 1.0.0
            </Text>

            <FloatingButton
                activeOpacity={0.9}
                disabled={loading}
                icon={loading ?
                    <DotIndicator size={5} color="white" />
                    :
                    <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                }
                onPress={submit}
            />




        </Container >

    )
}


export default AddUserNameScreen