import React, { JSX, RefObject, useRef, useState } from "react"
import { View, TextInput as RNTextInput } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import colors from "../../theme/colors"
import useTheme from "../../theme"
import Animated from "react-native-reanimated"
import Text from "../../components/Text"
import { stylesLogin } from "./styles"
import { AuthStackParams, SignUpScreenProps } from "../../navigator/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import TextInput, { RefTextInput } from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import type { RouteProp } from '@react-navigation/native';
import { DotIndicator } from "react-native-indicators"
import typogrphy from "../../theme/font"
type Props = {
    route: RouteProp<AuthStackParams, 'signup'>
    navigation: NativeStackNavigationProp<AuthStackParams, 'signup'>
};

function SignUpScreen({ navigation, route }: Props): JSX.Element {

    if (!route.params.phone_token) {
        navigation.goBack()
    }

    const [loading, setLoading] = useState(false)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    const ifname = useRef<RefTextInput>(null)
    const ilname = useRef<RefTextInput>(null)



    const submit = () => {

        if (fname == "") {
            ifname.current?.focus()
            return
        } else if (lname == "") {
            ilname.current?.focus()
            return
        }


        navigation.navigate("setusername", { phone: route.params.phone,phone_token: route.params.phone_token, firstname: fname.trim(), lastname: lname.trim() })

    }


    return (
        <Container
            style={{
                paddingTop: 30,
                padding: 30,
                // alignItems:'center'
            }}>
            <AppStatusBar translucent />
            <View style={stylesLogin().contentContainer}>

                <TextInput
                    ref={ifname}
                    value={fname}
                    onChangeText={setFname}
                    placeholder="First Name"
                    style={{ marginVertical: 13, }}
                    returnKeyType="next"
                    onSubmitEditing={() => ilname.current?.focus()} />
                <TextInput
                    ref={ilname}
                    value={lname}
                    onChangeText={setLname}
                    placeholder="Last Name"
                    style={{ marginVertical: 13, }}
                    onSubmitEditing={submit} />


            </View>
            {/* <View style={{ backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 0, alignSelf: 'center' }}> */}
            <Animated.View sharedTransitionTag="logo"
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
            {/* </View> */}
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


export default SignUpScreen