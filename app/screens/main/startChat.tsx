import { JSX } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import SimpleHeader from "../../components/SimpleHeader"
import ContactsList from "../../components/StarthatScreen/ConatactList"


function StartChatScreen(): JSX.Element {


    const username = useSelector<RootState, string | undefined | null>(state => state.auth.username)
    const firstname = useSelector<RootState, string | undefined | null>(state => state.auth.firstname)
    const lastname = useSelector<RootState, string | undefined | null>(state => state.auth.lastname)
    const phone = useSelector<RootState, string | undefined | null>(state => state.auth.phone)
    const token = useSelector<RootState, string | undefined | null>(state => state.auth.token)


    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',

            }}>

            <AppStatusBar translucent />
            <SimpleHeader title="Start Chat" />
            <ContactsList />
        </Container>

    )
}


export default StartChatScreen