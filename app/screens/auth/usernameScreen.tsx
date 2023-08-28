import React, { JSX, useState } from "react"
import { Keyboard, ToastAndroid, View } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import colors from "../../theme/colors"
import Animated from "react-native-reanimated"
import Text from "../../components/Text"
import { stylesLogin } from "./styles"
import { AuthStackParams } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import TextInput from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import type { RouteProp } from '@react-navigation/native';
import { DotIndicator } from "react-native-indicators"
import typogrphy from "../../theme/font"
import { login, signup } from "../../apis/auth"
import { addUserToStorage } from "../intro/utils"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../../reducers/auth"
import { loadUsersData } from "../../reducers/app"
import { AppDispatch } from "../../store"
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
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const dispatch = useDispatch<AppDispatch>()

    const submit = () => {
        setLoading(true)
        if (username.trim() === "") {
            Keyboard.dismiss()
        }

        signup({
            firstname: route.params.firstname,
            lastname: route.params.lastname,
            phone_key: route.params.phone_token,
            userid: username === "" ? undefined : username
        }).then(res => {
            if (res) {
                return login(route.params.phone_token)
            } else {
                throw Error("This username is already exists!")
            }
        }).then(res => {
            if (res)
                return addUserToStorage({
                    token: res.token,
                    phone: res.user.phone,
                    username: res.user.userid == "null" ? undefined : res.user.userid,
                    firstname: res.user.firstname,
                    lastname: res.user.lastname,
                    lastactive: true,
                })
            else
                throw Error("Unkown error!!!")

        }).then(data => {
            console.log(data);

            if (data) {

                dispatch(loadUsersData()).finally(() => {
                    navigation.reset({
                        index: 0,
                        //@ts-ignore
                        routes: [{ name: 'main' }],
                    })
                })
            } else {
                throw Error("DB Error!!!!")
            }
        }).catch(e => {
            console.log(e.message)
            setError(e.message)
            setLoading(false)
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
                <Text style={{ fontSize: typogrphy.fontSize.xsm, color: colors.error }}>{error}</Text>

                <TextInput
                    style={{ marginVertical: 10, }}
                    autoFocus
                    placeholder="Username (optional)"
                    value={username}
                    onChangeText={(t) => {
                        setError('');
                        setUsername(t);
                    }}
                    onSubmitEditing={submit} />
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