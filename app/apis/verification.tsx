import axios, { AxiosError } from 'axios';
import { AUTH_URL } from '../config';
import { OtherUserType } from '../types';


const CHECK_USER_WITH_USERNAME_URI = AUTH_URL + "check-username/"
const GET_INFO_WITH_USERNAME_URI = AUTH_URL + "get-user-info/"

const checkUserExistsWithUsername = async (username: string, token: string): Promise<boolean> => {

    try {
        const res = await axios({
            method: 'post',
            url: CHECK_USER_WITH_USERNAME_URI,
            headers: {
                "Authorization": "Token " + token
            },
            data: { username }
        })

        return res.data['exists']

    } catch (error: any | AxiosError) {
        if (error.response) {
            console.log(error.response);
        } else if (error.request) {
            console.log("No Response!");
        } else {
            console.log("Unkowen Error!");
        }
        throw error
    }
}

const getUserInfo = async (usernames: string[], token: string): Promise<OtherUserType[]> => {

    try {
        const res = await axios({
            method: 'post',
            url: GET_INFO_WITH_USERNAME_URI,
            headers: {
                "Authorization": "Token " + token
            },
            data: { usernames }
        })
        console.log(res.data);

        return res.data

    } catch (error: any | AxiosError) {
        if (error.response) {
            console.log(error.response);
        } else if (error.request) {
            console.log("No Response!");
        } else {
            console.log("Unkowen Error!");
        }
        throw error
    }
}

export { checkUserExistsWithUsername, getUserInfo }