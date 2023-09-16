import { ChatType } from "../types";
import { createChatTableIfNotExists, loadChatsFromUsername } from "./chat-service";
import { getDBConnection } from "./service";

export const loadChatFromStorage = async (currentUsername: string): Promise<ChatType[]> => {
    try {
        const db = await getDBConnection();
        await createChatTableIfNotExists(db);

        const chats = await loadChatsFromUsername(db, currentUsername)


        //Set first account in db to be login to app
        return chats

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return []
}