import React, { JSX, RefObject, useRef, useState, useCallback } from "react"
import { View, TextInput as RNTextInput, BackHandler } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { StackActions, useFocusEffect, } from "@react-navigation/native"
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
import { Image } from "expo-image"
type Props = {
    route: RouteProp<AuthStackParams, 'signup'>
    navigation: NativeStackNavigationProp<AuthStackParams, 'signup'>
};

function SignUpScreen({ navigation, route }: Props): JSX.Element {

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


        navigation.navigate("setusername", { phone: route.params.phone, phone_token: route.params.phone_token, firstname: fname.trim(), lastname: lname.trim() })

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

            <View
                style={{

                    position: 'absolute',
                    bottom: 20,
                    alignSelf: 'center',
                    flexDirection: 'row'
                }}
            >
                <Image source={require("../../assets/send.png")} style={{ width: 20, height: 20 }} />
                <Text style={{
                    color: "#888",
                    fontSize: typogrphy.fontSize.xsm,
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>
                    Nextalk 1.0.0
                </Text>

            </View>

            <FloatingButton
                activeOpacity={0.9}
                icon={<MaterialIcons name="keyboard-arrow-right" size={30} color="white" />}
                onPress={submit}
            />

        </Container >

    )
}


export default SignUpScreen