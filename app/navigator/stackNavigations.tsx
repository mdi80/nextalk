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
import ProfileScreen from "../screens/menu/profile";


const RootStack = createNativeStackNavigator()


export const RootStackNavigator = () => (

    <RootStack.Navigator>
        <RootStack.Screen name="intro" component={IntroScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="auth" component={AuthNavigator} options={{ headerShown: false, animation: 'none' }} />
        <RootStack.Screen name="main" component={MainNavigator} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </RootStack.Navigator>
)


const MainStack = createNativeStackNavigator<MainStackParams>()

export const MainNavigator = () => (

    <MainStack.Navigator>
        <MainStack.Screen name="home" component={MainScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="room" component={RoomScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="contacts" component={SettingsScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="features" component={ProfileScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="invite" component={SettingsScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="recentCalls" component={ProfileScreen} options={{ headerShown: false }} />

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