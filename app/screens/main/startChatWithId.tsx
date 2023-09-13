import { JSX, useEffect, useState } from "react"
import { SafeAreaView, StatusBar, View } from "react-native"
import FontAwesome6 from "react-native-vector-icons/FontAwesome5"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import SimpleHeader from "../../components/SimpleHeader"
import ContactsList from "../../components/StartChatScreen/ConatactList"
import TextInput from "../../components/InputText"
import FloatingButton from "../../components/floatingButton"
import UsernameValidator from "../../validators/usernameValidator"
import typogrphy from "../../theme/font"
import colors from "../../theme/colors"
import { checkUserExistsWithUsernam } from "../../apis/verification"
import { logoutCurrentUser } from "../../reducers/auth"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams } from "../../navigator/types"
import { BarIndicator, DotIndicator } from "react-native-indicators"


type ScreenProps = {
    navigation: NativeStackNavigationProp<MainStackParams, 'startwithuserid'>
}

function StartChatwithIdScreen({ navigation }: ScreenProps): JSX.Element {


    const token = useSelector<RootState, string | null>(state => state.auth.token)
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const validate = UsernameValidator(username)

        if (validate === "valid") {
            setError("")
        } else {
            setError(validate)
        }
    }, [username])

    const next = () => {
        if (!token) {
            dispatch(logoutCurrentUser())
        } else
            checkUserExistsWithUsernam(username, token).then(res => {
                if (res) {
                    navigation.replace("room", { username })
                } else
                    setError("User with this username is not exists!")
            })
    }

    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
            }}>

            <AppStatusBar translucent />
            <SimpleHeader title="Start Chat With Username" />
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: typogrphy.fontSize.xsm, color: colors.error, }}>{error}</Text>
                <TextInput
                    placeholder="Username"
                    style={{ paddingVertical: 10 }}
                    onChangeText={setUsername}
                />
                <Text style={{ fontSize: typogrphy.fontSize.xsm, marginVertical: 10 }}>Should be unique. Letters, digits and @/./+/-/_ only</Text>

            </View>

            <FloatingButton
                activeOpacity={0.9}
                onPress={next}
                icon={loading ?
                    <DotIndicator size={5} color="white" />
                    :
                    <FontAwesome6 name="long-arrow-alt-right" color="white" size={23} />}
                disabled={error !== "" || username === "" || loading} />
        </Container>

    )
}


export default StartChatwithIdScreen