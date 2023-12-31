import React, { JSX, useCallback, useState } from "react"
import { View, TouchableOpacity, BackHandler, Platform, Alert } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Animated from "react-native-reanimated"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import CodeInput from 'react-native-confirmation-code-input';
import { useDispatch, useSelector } from "react-redux"
import { DotIndicator } from "react-native-indicators"

import colors from "../../theme/colors"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import TextInput from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import { login, verifyPhone, verifyPhoneCode } from "../../apis/auth"
import { AuthStackParams } from "../../navigator/types"
import { AppStatusBar } from "../../components/StatusBar"
import { setUserInfo } from "../../reducers/auth"
import useTheme from "../../theme"
import { stylesphoneVeify } from "./styles"
import TimerAuthView from "../../components/timerAuthView"
import { addUserToStorage } from "../../db/auth-apis"
import { RouteProp, useFocusEffect, } from "@react-navigation/native"
import SimpleDialog from "../../components/dialogs/simpleDialog"
import { AppState } from "react-native"
import { AppDispatch, RootState } from "../../store"
import { IAppState, loadUsersData } from "../../reducers/app"
import { Image } from "expo-image"

type Props = {
    route: RouteProp<AuthStackParams, 'phone'>
    navigation: NativeStackNavigationProp<AuthStackParams, 'auth_intro'>
};
const smsAuthTTL = 120
const phoneNumberPattern = /^\+[0-9]{12,}$/;




function InsertPhoneVerify({ navigation, route }: Props): JSX.Element {

    const { colorScheme, colorText } = useTheme()

    const codeInputRed = React.useRef(null)
    const timerInterval = React.useRef<NodeJS.Timeout | null>(null)


    const [timerSec, setTimerSec] = React.useState(0)
    const [phoneSmsSent, setPhoneSmsSent] = React.useState<string | null>(null)
    const [phoneInput, setPhoneInput] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [codeSend, setCodeSend] = React.useState(false)
    const [error, setError] = React.useState("")
    const [timeUpDialog, setTimeUpDialog] = useState(false)
    const [allowPhone, setAllowPhone] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const { allUsersInfo } = useSelector<RootState, IAppState>(state => state.app)
    const [loadingCheckCode, setLoadingCheckCode] = useState<boolean>(false)
    // const now = React.useRef(new Date())



    const createTwoButtonAlert = () =>
        Alert.alert('Time Up!', 'Your time is up. You can get another code.', [
            {
                text: 'Try Again', onPress: () => {
                    setCodeSend(false);
                    setPhoneSmsSent(null);
                }
            },
        ]);
    const backToInsertPhone = () => {
        setError('');
        setCodeSend(false);
    }

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (route.params.canBack) {
                    return false
                }

                if (codeSend)
                    backToInsertPhone();
                else if (Platform.OS === "android")
                    BackHandler.exitApp()
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                subscription.remove();
            };
        }, [codeSend, backToInsertPhone, navigation])
    );

    React.useEffect(() => {
        if (timerSec === smsAuthTTL && timerInterval.current) {
            setTimerSec(0)
            clearInterval(timerInterval.current)
            createTwoButtonAlert()
            setPhoneInput('')
        }
    }, [timerSec])
    React.useEffect(() => {
        if (!phoneSmsSent) return
        if (timerInterval.current) {
            setTimerSec(0)
            clearInterval(timerInterval.current)
        }


        const initTime = new Date()
        timerInterval.current = setInterval(() => {
            console.log(Math.floor((new Date().getTime() - initTime.getTime()) / 1000));

            setTimerSec(Math.floor((new Date().getTime() - initTime.getTime()) / 1000))
        }, 1000)

        return () => {
            if (timerInterval.current)
                clearInterval(timerInterval.current);
        }
    }, [phoneSmsSent])

    const clearTimer = () => {

        if (timerInterval.current)
            clearInterval(timerInterval.current)
        setTimerSec(0)
    }

    const onChangeText = (v: string) => {
        let allow = true
        allUsersInfo?.forEach(item => {

            if (item.phone === v) {
                allow = false
            }
        })
        setAllowPhone(allow)
        setPhoneInput(v);

        clearTimer();
        setError('');
    }

    const onFulfill = (code: number) => {
        setLoadingCheckCode(true)
        if (phoneSmsSent)
            verifyPhoneCode(phoneSmsSent, code)
                .then(res => {
                    if (!res)
                        setError("Incorrect!")
                    else {
                        clearTimer();
                        setCodeSend(false)
                        setPhoneInput("")
                        setPhoneSmsSent(null)

                        if (res.new)
                            navigation.navigate("signup", { phone_token: res.key, phone: phoneInput.trim() })
                        else
                            return login(res.key)
                    }
                }).then(res => {//this will save user data into storage if login successed
                    // console.log(res);

                    if (res)
                        return addUserToStorage({
                            token: res.token,
                            phone: res.user.phone,
                            username: res.user.userid,
                            firstname: res.user.firstname,
                            lastname: res.user.lastname,
                            lastactive: true,
                        })


                }).then(data => { // this will save user data into store
                    if (data) {
                        dispatch(loadUsersData())
                    }
                }).catch(e => {
                    console.log(e.message)
                }).finally(() => {
                    setLoadingCheckCode(false)
                })
    }

    const onPressNext = () => {

        if (phoneInput.trim() === "") {
            setError("Enter something FOOL")
        } else if (!phoneInput.startsWith("+")) {
            setError("Should start with +")
        } else if (!phoneNumberPattern.test(phoneInput)) {
            setError("Phone number is not Valid!")
        } else {

            setPhoneSmsSent(phoneInput)
            setError("")
            setLoading(true)
            verifyPhone(phoneInput).
                then(res => {
                    if (res == 200) {
                        setCodeSend(true)
                    } else if (res == 406) {
                        setError("Provider Can not send sms to this Phone\n number! Try again later.")
                    } else {
                        throw Error("Unkowen Error!")
                    }

                }).catch((error: Error) => {
                    setError(error.message)
                }).finally(() => {
                    setLoading(false)
                })
        }



    }


    return (
        <Container
            style={stylesphoneVeify().container}>
            <AppStatusBar translucent />
            <View
                style={stylesphoneVeify().contentContainer}>

                <Animated.View sharedTransitionTag="logo">
                    <Image source={require("../../assets/send.png")} style={{ width: 100, height: 100 }} />
                </Animated.View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={stylesphoneVeify().errortv}>
                        {error}
                    </Text>
                    {codeSend ?
                        <>
                            <Text
                                style={stylesphoneVeify().enterCodetv}>
                                Please Enter Verification code
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={stylesphoneVeify().phoneTextView}>
                                    {phoneSmsSent}
                                </Text>
                                <TouchableOpacity
                                    onPress={backToInsertPhone}>
                                    <Text style={stylesphoneVeify().editBtntv}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </>
                        :
                        <Text style={stylesphoneVeify().enterPhonetv}>
                            Please Enter your Phone number
                        </Text>
                    }
                    {!codeSend ?
                        <>
                            <TextInput
                                style={stylesphoneVeify(colorScheme).phoneTextInput}
                                value={phoneInput}
                                placeholder="Phone"
                                onChangeText={onChangeText}
                                keyboardType="phone-pad"
                                maxLength={17}
                                onSubmitEditing={() => onPressNext()}
                            />
                            <Text style={stylesphoneVeify().allowPhoneText}>{!allowPhone && "You already login with this phone!"}</Text>
                        </>
                        :

                        <CodeInput
                            ref={codeInputRed}
                            containerStyle={{ flex: 0 }}
                            className={'border-b'}
                            space={7}
                            codeLength={6}
                            size={30}
                            inputPosition='left'
                            onFulfill={onFulfill}
                            activeColor={colors.primary}
                            inactiveColor={colors.primary}
                            keyboardType="numeric"
                        />

                    }

                </View>

            </View>
            {codeSend ?

                loadingCheckCode ? <DotIndicator style={{ position: 'absolute', bottom: 30 }} size={7} color={colors.primary} /> : <TimerAuthView timer={smsAuthTTL - timerSec} />
                :
                <FloatingButton
                    activeOpacity={0.9}
                    disabled={loading || !allowPhone}
                    icon={loading ?
                        <DotIndicator size={5} color="white" />
                        :
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                    }
                    onPress={() => onPressNext()}
                />
            }
            <SimpleDialog
                visible={timeUpDialog}
                btnCilck={() => {
                    console.log("here")
                }}
                btnText="Try Again"
                close={() => setTimeUpDialog(false)}
                text="Your Time is finshed!"
            />
        </Container>
    )
}


export default InsertPhoneVerify