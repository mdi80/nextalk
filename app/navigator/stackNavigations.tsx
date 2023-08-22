import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import InsertPhoneVerify from "../screens/auth/insertPhoneScreen";
import IntroScreen from "../screens/intro";
import InsertCodeVerify from "../screens/auth/insertCodeVerifyScreen";
import IntroAuthScreen from "../screens/auth/introScreen";
import MainScreen from "../screens/main";
import { AuthStackParams, MainStackParams, RootStackParamsType } from "./types";


const RootStack = createNativeStackNavigator()






export const RootStackNavigator = () => (

    <RootStack.Navigator>
        <RootStack.Screen name="intro" component={IntroScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="auth" component={AuthNavigator} options={{ headerShown: false, animation: 'none' }} />
        <RootStack.Screen name="main" component={MainNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
)


const MainStack = createNativeStackNavigator()

export const MainNavigator = () => (

    <MainStack.Navigator>
        <MainStack.Screen name="home" component={MainScreen} options={{ headerShown: false }} />

    </MainStack.Navigator>

)




const AuthStack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigator = () => (

    <AuthStack.Navigator>
        <RootStack.Screen name="auth_intro" component={IntroAuthScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name="phone" component={InsertPhoneVerify} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
        <AuthStack.Screen name="verifyphone" component={InsertCodeVerify} options={{ headerShown: false, animation: 'none' }} />

        {/* <AuthStack.Screen name="login" component={InsertPhoneVerify} options={{ headerShown: false }} /> */}
    </AuthStack.Navigator>

)