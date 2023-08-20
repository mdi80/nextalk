import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import IntroScreen from "../screens/intro";


const Stack = createNativeStackNavigator()


export const MainStackNavigator = () => (

    <Stack.Navigator>
        <Stack.Screen name="intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)

