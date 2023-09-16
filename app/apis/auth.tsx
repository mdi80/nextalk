import axios, { AxiosError } from 'axios';
import { AUTH_URL } from '../config';


const LOGOUT_URL = AUTH_URL + "logout/"
const VERIFY_PHONE_URL = AUTH_URL + "verify/"
const VERIFY_CODE_URL = AUTH_URL + "check-code/"
const SIGNUP_URL = AUTH_URL + "user/"
const LOGIN_URL = AUTH_URL + "login/"




const verifyPhone = async (phone: string): Promise<number> => {

    try {
        const { status } = await axios.post(VERIFY_PHONE_URL, { phone }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return status


    } catch (error: any | AxiosError) {

        if (error.response) {
            return error.response.status
        } else if (error.request) {
            throw Error("No Response!")
        } else {
            throw Error("Unkowen Error!")
        }
    }

}

interface verifyPhoneCodeReturnType {
    key: string
    new: boolean
    firstname?: string
    lastname?: string
    username?: string
}

const verifyPhoneCode = async (phone: string, code: number): Promise<verifyPhoneCodeReturnType | null> => {

    try {
        const { data, status } = await axios.post(VERIFY_CODE_URL, { phone, code }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return data

    } catch (error: any | AxiosError) {
        if (error.response) {
            return null
        } else if (error.request) {
            throw Error("No Response!")
        } else {
            throw Error("Unkowen Error!")
        }
    }

}


interface signupProps {
    phone_key: string
    firstname: string
    lastname: string
    userid?: string
}


const signup = async (data: signupProps): Promise<boolean | string> => {

    try {
        const res = await axios.post(SIGNUP_URL, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return res.status === 201

    } catch (error: any | AxiosError) {
        if (error.response) {
            // console.log(error.response.data)
            if (error.response.data['userid'])
                return false
            throw Error("Unkown errors!")
        } else if (error.request) {
            throw Error("No Response!")
        } else {
            throw Error("Unkowen Error!")
        }
    }

}

interface returnUserInfo {
    firstname: string,
    lastname: string,
    phone: string,
    userid: string,
    date_joined: string

}

interface loginResault {
    token: string
    user: returnUserInfo
}


const login = async (phone_token: string): Promise<loginResault> => {

    try {
        const { data, status } = await axios.post(LOGIN_URL, { phone_token: phone_token }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


        return data

    } catch (error: any | AxiosError) {

        if (error.response) {
            throw Error(error.response?.statusText)
        } else if (error.request) {
            throw Error("No Response!")
        } else {
            throw Error("Unkowen Error!")
        }
    }

}




const logoutToken = async (token: string | null): Promise<boolean> => {
    if (!token) {
        return true
    }

    try {
        const res = await axios({
            method: 'get',
            url: LOGOUT_URL,
            headers: {
                "Authorization": "Token " + token
            }
        })

    } catch (error: any | AxiosError) {
        if (error.response) {
            console.log(error.response);

        } else if (error.request) {
            console.log("No Response!");

        } else {
            console.log("Unkowen Error!");

        }
    }




    return false
}

export { logoutToken, verifyPhone, verifyPhoneCode, signup, login, }