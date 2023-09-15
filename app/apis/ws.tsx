import axios, { AxiosError } from 'axios';
import { AUTH_URL } from '../config';


const GET_TICKET_URL = AUTH_URL + "get-ticket/"





const getTicket = async (token: string): Promise<string | number | null> => {


    try {
        console.log(GET_TICKET_URL);

        const res = await axios({
            method: 'get',
            url: GET_TICKET_URL,
            headers: {
                "Authorization": "Token " + token
            },
            timeout: 5000
        })

        return res.data['ticket']

    } catch (error: any | AxiosError) {
        if (error.response) {
            console.log(error.response.status);
            return error.response.status
        } else if (error.request) {
            console.log("No Response!");
        } else {
            console.log("Unkowen Error!");

        }
        throw error
    }
}

export { getTicket }