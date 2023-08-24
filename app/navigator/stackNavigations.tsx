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


const RootStack = createNativeStackNavigator()






export const RootStackNavigator = () => (

    <RootStack.Navigator>
        <RootStack.Screen name="intro" component={IntroScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="auth" component={AuthNavigator} options={{ headerShown: false, animation: 'none' }} />
        <RootStack.Screen name="main" component={MainNavigator} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </RootStack.Navigator>
)


const MainStack = createNativeStackNavigator()

export const MainNavigator = () => (

    <MainStack.Navigator>
        <MainStack.Screen name="home" component={MainScreen} options={{ headerShown: false }} />

    </MainStack.Navigator>

)




const AuthStack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigator = () => {
    return (

        <AuthStack.Navigator>
            <RootStack.Screen name="auth_intro" component={IntroAuthScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="phone" component={InsertPhoneVerify} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
            <AuthStack.Screen name="signup" component={SignUpScreen} options={{ headerTitle: "Sign Up", headerTitleAlign: 'center', animation: 'fade_from_bottom', headerTintColor: 'white', headerStyle: { backgroundColor: colors.primary } }} />
            <AuthStack.Screen name="setusername" component={AddUserNameScreen} options={{ headerTitle: 'Username', headerTitleAlign: 'center', animation: 'fade_from_bottom', headerTintColor: 'white', headerStyle: { backgroundColor: colors.primary } }} />

        </AuthStack.Navigator>

    )
}