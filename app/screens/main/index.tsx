import { JSX } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"


function MainScreen(): JSX.Element {



    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <Text>Home</Text>
        </SafeAreaView>

    )
}


export default MainScreen