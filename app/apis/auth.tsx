import axios, { AxiosError } from 'axios';
import { AUTH_URL } from '../config';


const LOGOUT_URL = AUTH_URL + "logout"


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

export { logoutToken }