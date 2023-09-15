import { JSX } from "react"
import { ActivityIndicator, ImageBackground, SafeAreaView, StatusBar, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams, RootStackParamsType } from "../../navigator/types"
import RoomHeader from "../../components/RoomScreen/RoomHeader"
import useTheme from "../../theme"
import RoomChatBox from "../../components/RoomScreen/ChatBox"
import Animated from "react-native-reanimated"
import { ChatType, OtherUserType } from "../../types"
import RoomChatList from "../../components/RoomScreen/ChatList"
import { getUserInfo } from "../../apis/verification"
import { logoutCurrentUser } from "../../reducers/auth"
import { newUser } from "../../reducers/chat"
import { DotIndicator } from "react-native-indicators"

type Props = {
    route: RouteProp<MainStackParams, 'room'>
    navigation: NativeStackNavigationProp<MainStackParams, 'room'>
};

function RoomScreen({ navigation, route }: Props): JSX.Element | null {

    const { colorScheme, colorText } = useTheme()
    const user = useSelector<RootState, OtherUserType | undefined>(state => state.chat.users.find(item => item.username == route.params.username))
    const token = useSelector<RootState, string | null>(state => state.auth.token)
    const dispatch = useDispatch<AppDispatch>()
    if (!user) {
        // TODO Get user info
        if (!token) {
            dispatch(logoutCurrentUser())
        } else {
            getUserInfo(route.params.username, token).then(res => {
                dispatch(newUser(res))
            })
        }

        return (
            <Container
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <DotIndicator size={10} color={colorText} style={{ flex: 0, margin: 10 }} />
                <Text>
                    Loading User...
                </Text>
            </Container>
        )

    }


    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <AppStatusBar translucent />
            <RoomHeader name={user?.firstname + " " + user?.lastname} username={user?.username} lastseen={user.lastActiveDateTime} />
            <ImageBackground
                style={{ flex: 1, width: '100%' }}
                source={colorScheme === "light" ? require("../../assets/roomPatternLight.png") : require("../../assets/roomPatternDark.png")}
                resizeMode="cover">


                <RoomChatList username={user.username} />

                <RoomChatBox username={user.username} />

            </ImageBackground>
        </Container>

    )
}


export default RoomScreen