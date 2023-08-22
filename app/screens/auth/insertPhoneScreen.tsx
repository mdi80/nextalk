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
import { verifyPhone } from "../../apis/auth"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParams } from "../../navigator/types"

type Props = {
    navigation: NativeStackNavigationProp<AuthStackParams, 'auth_intro'>
};

function InsertPhoneVerify({ navigation }: Props): JSX.Element {


    const [phoneInput, setPhoneInput] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const phoneNumberPattern = /^\+[0-9]{12,}$/;

    const onPressNext = () => {


        if (phoneInput.trim() === "") {
            navigation.navigate("verifyphone")
            // setError("Enter something FOOL")
        } else if (!phoneInput.startsWith("+")) {
            setError("Should start with +")

        } else if (!phoneNumberPattern.test(phoneInput)) {

            setError("Phone number is not Valid!")

        } else {

            setError("")
            setLoading(true)
            verifyPhone(phoneInput).
                then(res => {
                    if (res == 200) {
                        navigation.navigate("verifyphone")
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
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
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
                    <TextInput
                        placeholder="Enter Phone number."
                        style={{ width: 200, marginLeft: 10 }}
                        value={phoneInput}
                        onChangeText={setPhoneInput}
                        keyboardType="phone-pad"
                    />

                </View>

            </View>

            <FloatingButton
                disabled={loading}
                icon={loading ?
                    <DotIndicator size={5} color="white" />
                    :
                    <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
                }
                onPress={() => onPressNext()}
            />
        </Container>
    )
}


export default InsertPhoneVerify