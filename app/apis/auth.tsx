import axios, { AxiosError } from 'axios';
import { AUTH_URL } from '../config';


const LOGOUT_URL = AUTH_URL + "logout/"
const VERIFY_PHONE_URL = AUTH_URL + "verify/"
const VERIFY_CODE_URL = AUTH_URL + "check-code/"





const verifyPhone = async (phone: string): Promise<number> => {

    try {
        const { data, status } = await axios.post(VERIFY_PHONE_URL, { phone }, {
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
    first_name?: string
    last_name?: string
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
            console.log(error.response);

        } else {
            console.log(error.response);

        }
    }




    return false
}

export { logoutToken, verifyPhone, verifyPhoneCode }