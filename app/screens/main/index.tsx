import { JSX } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"


function MainScreen(): JSX.Element {


    const username = useSelector<RootState, string | undefined | null>(state => state.auth.username)
    const first_name = useSelector<RootState, string | undefined | null>(state => state.auth.firstname)
    const last_name = useSelector<RootState, string | undefined | null>(state => state.auth.lastname)
    const phone = useSelector<RootState, string | undefined | null>(state => state.auth.phone)
    const token = useSelector<RootState, string | undefined | null>(state => state.auth.token)


    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                
            <AppStatusBar translucent />
            <Text>{username}</Text>
            <Text>{first_name}</Text>
            <Text>{last_name}</Text>
            <Text>{phone}</Text>
            <Text>{token}</Text>

        </Container>

    )
}


export default MainScreen