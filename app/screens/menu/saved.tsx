import { JSX } from "react"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"


function SavedScreen(): JSX.Element {


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
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />
            <Text>saved</Text>
        </Container>

    )
}


export default SavedScreen