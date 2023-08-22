import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type IntroScreenParmas = {}

export type RootStackParamsType = {
    intro: IntroScreenParmas
    auth: AuthStackParams
    main: MainStackParams
}

export type MainStackParams = {
    home: undefined
}



export type AuthStackParams = {
    auth_intro: undefined
    phone: undefined
} 
