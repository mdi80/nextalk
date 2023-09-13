import { JSX } from "react"
import { ImageBackground, SafeAreaView, StatusBar, View } from "react-native"
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
import RoomHeader from "../../components/RoomScreen/RoomHeader"
import useTheme from "../../theme"
import RoomChatBox from "../../components/RoomScreen/ChatBox"

type Props = {
    route: RouteProp<MainStackParams, 'room'>
    navigation: NativeStackNavigationProp<MainStackParams, 'room'>
};

function RoomScreen({ navigation, route }: Props): JSX.Element {

    const { colorScheme } = useTheme()
    const name = "mahdi"



    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />
            <RoomHeader name={name} />
            <ImageBackground
                style={{ flex: 1, width: '100%' }}
                source={colorScheme === "light" ? require("../../assets/roomPatternLight.png") : require("../../assets/roomPatternDark.png")}
                resizeMode="cover">

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Text>No Message!</Text>
                </View>

                <RoomChatBox />

            </ImageBackground>
        </Container>

    )
}


export default RoomScreen