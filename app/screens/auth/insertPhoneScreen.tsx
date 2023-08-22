import React, { JSX } from "react"
import { SafeAreaView, StatusBar, View, TouchableOpacity } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Animated from "react-native-reanimated"
import colors from "../../theme/colors"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import TextInput from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import { BarIndicator, DotIndicator, MaterialIndicator } from "react-native-indicators"
import typogrphy from "../../theme/font"
import { verifyPhone, verifyPhoneCode } from "../../apis/auth"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParams } from "../../navigator/types"
import CodeInput from 'react-native-confirmation-code-input';
import { AppStatusBar } from "../../components/StatusBar"
import { useDispatch } from "react-redux"

type Props = {
    navigation: NativeStackNavigationProp<AuthStackParams, 'auth_intro'>
};
const smsAuthTTL = 120
const phoneNumberPattern = /^\+[0-9]{12,}$/;

function InsertPhoneVerify({ navigation }: Props): JSX.Element {


    const codeInputRed = React.useRef(null)

    const timerInterval = React.useRef<NodeJS.Timeout | null>(null)

    const [phoneSmsSent, setPhoneSmsSent] = React.useState<string | null>(null)
    const [timerSec, setTimerSec] = React.useState(0)


    const [phoneInput, setPhoneInput] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [codeSend, setCodeSend] = React.useState(false)


    const dispatch = useDispatch()

    React.useEffect(() => {
        if (timerSec === smsAuthTTL && timerInterval.current) {
            setTimerSec(0)
            clearInterval(timerInterval.current)
            setError("Yor time is up!")
            setCodeSend(false)
            setPhoneSmsSent(null)
        }
    }, [timerSec])


    React.useEffect(() => {
        if (!phoneSmsSent) return
        if (timerInterval.current) {
            setTimerSec(0)
            clearInterval(timerInterval.current)
        }

        timerInterval.current = setInterval(() => {
            setTimerSec(prev => prev + 1)
        }, 1000)


    }, [phoneSmsSent])

    const clearTimer = () => {
        if (timerInterval.current)
            clearInterval(timerInterval.current)
        setTimerSec(0)
    }

    const onFulfill = (code: number) => {
        if (phoneSmsSent)
            verifyPhoneCode(phoneSmsSent, code)
                .then(res => {

                    console.log(res);
                    if (!res) {
                        setError("Incorrect!")
                    }




                }).catch(error => {
                    setError(error.message)
                })
    }

    const onPressNext = () => {

        if (phoneInput.trim() === "") {
            // navigation.navigate("verifyphone")
            setError("Enter something FOOL")
        } else if (!phoneInput.startsWith("+")) {
            setError("Should start with +")

        } else if (!phoneNumberPattern.test(phoneInput)) {

            setError("Phone number is not Valid!")

        } else {

            //User does not change number: Do nothing
            if (phoneInput === phoneSmsSent) {
                setCodeSend(true)
                return
            }

            setPhoneSmsSent(phoneInput)
            setError("")
            setLoading(true)
            verifyPhone(phoneInput).
                then(res => {
                    if (res == 200) {
                        // navigation.navigate("verifyphone")
                        setCodeSend(true)
                    } else if (res == 406) {
                        setError("Provider Can not send sms to this Phone number!")
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
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <AppStatusBar translucent />
            <View
                style={{
                    height: 300,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                <Animated.View sharedTransitionTag="intro">
                    <FontAwesome name="send-o" color={colors.primary} size={100} />
                </Animated.View>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: typogrphy.fontSize.sm, color: "red", marginBottom: 10 }}>
                        {error}
                    </Text>
                    {codeSend &&
                        <>
                            <Text
                                style={{
                                    fontSize: typogrphy.fontSize.sm,
                                    color: "#aaaaaa",
                                    marginBottom: 10
                                }}>
                                Please Enter Verification code
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: typogrphy.fontSize.sm,
                                        color: "#aaaaaa",
                                        marginBottom: 10,
                                        marginRight: 10,
                                    }}>
                                    {phoneInput}
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    setError('');
                                    setCodeSend(false);
                                }}>
                                    <Text style={{ color: colors.primary }}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </>
                    }
                    {!codeSend ?
                        <TextInput
                            placeholder="Enter Phone number."
                            style={{ width: 200, marginLeft: 10 }}
                            value={phoneInput}
                            onChangeText={(v) => {
                                setPhoneInput(v);
                                clearTimer();
                                setError('');
                            }}
                            keyboardType="phone-pad"
                        />
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
                <View
                    style={{
                        position: 'absolute',
                        bottom: 20,
                    }}>
                    <Text
                        style={{
                            color: "#777",
                            fontSize: typogrphy.fontSize.lg
                        }}>

                        {Math.floor((smsAuthTTL - timerSec) / 60)} : {((smsAuthTTL - timerSec) % 60) < 10 && "0"}{(smsAuthTTL - timerSec) % 60}
                    </Text>
                </View>
                :
                <FloatingButton
                    disabled={loading}
                    icon={loading ?
                        <DotIndicator size={5} color="white" />
                        :
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                    }
                    onPress={() => onPressNext()}
                />
            }
        </Container>
    )
}


export default InsertPhoneVerify