import { JSX, useState } from "react"
import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import typogrphy from "../../theme/font"


function ContactsScreen(): JSX.Element {


    const username = useSelector<RootState, string | undefined | null>(state => state.auth.username)
    const firstname = useSelector<RootState, string | undefined | null>(state => state.auth.firstname)
    const lastname = useSelector<RootState, string | undefined | null>(state => state.auth.lastname)
    const phone = useSelector<RootState, string | undefined | null>(state => state.auth.phone)
    const token = useSelector<RootState, string | undefined | null>(state => state.auth.token)
    const [n, set] = useState(false)

    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />
            <TouchableOpacity onPress={() => set(prev => !prev)}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                        fontSize: typogrphy.fontSize.sm,
                        color: "#555"
                    }}>
                    {n ? "fasd" : "مبسیب"}
                </Text>

            </TouchableOpacity>

        </Container>

    )
}


export default ContactsScreen