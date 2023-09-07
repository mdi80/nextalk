import { JSX, useState } from "react"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"
import { AppStatusBar } from "../../components/StatusBar"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import MainHeader from "../../components/MainScreen/Header"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParams } from "../../navigator/types"
import { Drawer } from 'react-native-drawer-layout';
import { TouchableOpacity } from "react-native"
import DrawerContent from "../../components/MainScreen/DrawerContent"



type Props = {
    navigation: NativeStackNavigationProp<MainStackParams, 'home'>
};

function MainScreen({ navigation }: Props): JSX.Element {

    // const dispatch = useDispatch<AppDispatch>()

    // dispatch(connectWebSocket())
    const username = useSelector<RootState, string | undefined | null>(state => state.auth.username)
    const firstname = useSelector<RootState, string | undefined | null>(state => state.auth.firstname)
    const lastname = useSelector<RootState, string | undefined | null>(state => state.auth.lastname)
    const phone = useSelector<RootState, string | undefined | null>(state => state.auth.phone)
    const token = useSelector<RootState, string | undefined | null>(state => state.auth.token)
    const [showDrawer, setShowDrawer] = useState(false)

    return (
        <Drawer
            open={showDrawer}
            onOpen={() => setShowDrawer(true)}
            onClose={() => setShowDrawer(false)}
            drawerPosition="left"
            drawerType="front"
            swipeEdgeWidth={500}
            drawerStyle={{ width: "75%" }}
            renderDrawerContent={() => {
                return <DrawerContent />;
            }}>
            <Container
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


                <AppStatusBar translucent />
                <MainHeader navigation={navigation} openDrawer={() => setShowDrawer(true)} />
                <Text style={{ alignSelf: 'center' }}>{username}</Text>
                <Text>{firstname}</Text>
                <Text>{lastname}</Text>
                <Text>{phone}</Text>
                <TouchableOpacity onPress={() => setShowDrawer(true)}>
                    <Text>{token}</Text>
                </TouchableOpacity>
            </Container>

        </Drawer>



    )
}




export default MainScreen