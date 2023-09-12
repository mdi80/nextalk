import { JSX } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams, RootStackParamsType } from "../../navigator/types"

type Props = {
    route: RouteProp<MainStackParams, 'room'>
    navigation: NativeStackNavigationProp<MainStackParams, 'room'>
};

function RoomScreen({ navigation, route }: Props): JSX.Element {




    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />
            
            <Text>start chat with : {route.params.identity}</Text>

        </Container>

    )
}


export default RoomScreen