import { JSX } from "react"
import { SafeAreaView, Text, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"


function LoginScreen(): JSX.Element {



    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <FontAwesome name="send-o" color="#0DB787" size={80} />
        </SafeAreaView>

    )
}


export default LoginScreen