import { NavigatorScreenParams } from '@react-navigation/native';

export type SignUpScreenProps = {
    phone_token: string
    phone: string
    canBack?: boolean
}
export type AddUserNameScreenProps = {
    phone_token: string
    phone: string
    firstname: string
    lastname: string
}

export type RootStackParamsType = {
    intro: NavigatorScreenParams<undefined>
    auth: NavigatorScreenParams<AuthStackParams>
    main: NavigatorScreenParams<MainStackParams>
}

export type MainStackParams = {
    home: undefined
    room: undefined
    settings: undefined
    profile: undefined
}



export type AuthStackParams = {
    auth_intro: undefined
    phone: undefined
    signup: SignUpScreenProps
    setusername: AddUserNameScreenProps
} 
