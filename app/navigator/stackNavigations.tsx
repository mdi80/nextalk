import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InsertPhoneVerify from "../screens/auth/insertPhoneScreen";
import IntroScreen from "../screens/intro";
import SignUpScreen from "../screens/auth/signUpScreen";
import IntroAuthScreen from "../screens/auth/introScreen";
import MainScreen from "../screens/main";
import { AuthStackParams, MainStackParams, RootStackParamsType } from "./types";
import useTheme from "../theme";
import colors from "../theme/colors";
import AddUserNameScreen from "../screens/auth/usernameScreen";
import RoomScreen from "../screens/main/room";
import SettingsScreen from "../screens/menu/settings";
import SavedScreen from "../screens/menu/saved";
import ContactsScreen from "../screens/menu/contacts";
import FeaturesScreen from "../screens/menu/features";
import InviteScreen from "../screens/menu/invite";
import RecentCallsScreen from "../screens/menu/recentCalls";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigation } from "@react-navigation/native";
import StartChatScreen from "../screens/main/startChat";
import StartChatwithIdScreen from "../screens/main/startChatWithId";


const RootStack = createNativeStackNavigator()


export const RootStackNavigator = () => {

    const token = useSelector<RootState, string | null>(state => state.auth.token)
    const navigation = useNavigation()
    useEffect(() => {
        console.log(token);
        if (!token) {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'auth' }],
            })
            return
        }
        navigation.reset({
            index: 0,
            //@ts-ignore
            routes: [{ name: 'main' }],
        })
    }, [token])


    return (

        <RootStack.Navigator>
            <RootStack.Screen name="intro" component={IntroScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="auth" component={AuthNavigator} options={{ headerShown: false, animation: 'none' }} />
            <RootStack.Screen name="main" component={MainNavigator} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        </RootStack.Navigator>
    )
}

const MainStack = createNativeStackNavigator<MainStackParams>()

export const MainNavigator = () => (

    <MainStack.Navigator>

        <MainStack.Screen name="home" component={MainScreen} options={{ headerShown: false, animationDuration: 100 }} />

        <MainStack.Screen name="startchat" component={StartChatScreen} options={{ headerShown: false, animationDuration: 100 }} />
        <MainStack.Screen name="startwithuserid" component={StartChatwithIdScreen} options={{ headerShown: false, animationDuration: 100 }} />

        <MainStack.Screen name="room" component={RoomScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="saved" component={SavedScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="contacts" component={ContactsScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="features" component={FeaturesScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="invite" component={InviteScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />
        <MainStack.Screen name="recentCalls" component={RecentCallsScreen} options={{ headerShown: false, animationDuration: 10, animation: "fade_from_bottom" }} />

    </MainStack.Navigator>

)




const AuthStack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigator = () => {
    return (

        <AuthStack.Navigator>
            <RootStack.Screen
                name="auth_intro"
                component={IntroAuthScreen}
                options={{ headerShown: false }} />
            <AuthStack.Screen
                name="phone"
                component={InsertPhoneVerify}
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom'
                }} />
            <AuthStack.Screen
                name="signup"
                component={SignUpScreen}
                options={{
                    headerBackVisible: false,
                    headerTitle: "Sign Up",
                    headerTitleAlign: 'center',
                    animation: 'fade_from_bottom',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: colors.primary }
                }} />
            <AuthStack.Screen
                name="setusername"
                component={AddUserNameScreen}
                options={{
                    headerTitle: 'Username',
                    headerTitleAlign: 'center',
                    animation: 'slide_from_right',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: colors.primary }
                }} />

        </AuthStack.Navigator>

    )
}