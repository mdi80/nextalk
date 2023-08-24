import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from '@react-navigation/native';

export type IntroScreenParmas = {}

export type RootStackParamsType = {
    intro: NavigatorScreenParams<IntroScreenParmas>
    auth: NavigatorScreenParams<AuthStackParams>
    main: NavigatorScreenParams<MainStackParams>
}

export type MainStackParams = {
    home: undefined
}



export type AuthStackParams = {
    auth_intro: undefined
    phone: undefined
    login: { phone_key: string } | undefined
} 
