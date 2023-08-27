import { JSX } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import MainHeader from "../../components/MainScreenHeader"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams, RootStackParamsType } from "../../navigator/types"

type Props = {
    navigation: NativeStackNavigationProp<MainStackParams, 'room'>
};

function RoomScreen({ navigation }: Props): JSX.Element {



    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />

            <Text>room</Text>

        </Container>

    )
}


export default RoomScreen