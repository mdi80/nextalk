import { ChatType } from "../types";
import { createChatTableIfNotExists, insertAllNewChats, insertNewChat, loadChatsFromUsername, updateChatIdWithConfirm } from "./chat-service";
import { getDBConnection } from "./service";

export const loadChatFromStorage = async (username: string, currentPhone: string): Promise<ChatType[]> => {
    try {
        const db = await getDBConnection();
        await createChatTableIfNotExists(db);

        const chats = await loadChatsFromUsername(db, username, currentPhone)


        //Set first account in db to be login to app
        return chats

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return []
}



export const saveNewMessageSend = async (data: ChatType, currentPhone: string) => {
    const db = await getDBConnection();
    await createChatTableIfNotExists(db);

    const chats = await insertNewChat(db, data.to_user, data, currentPhone)


    //Set first account in db to be login to app
    return chats

}

export const saveNewMessageReceive = async (data: ChatType, currentPhone: string) => {
    const db = await getDBConnection();
    await createChatTableIfNotExists(db);

    const chats = await insertNewChat(db, data.from_user, data, currentPhone)

    return chats

}


export const syncNewMessagesReceive = async (data: ChatType[], currentPhone: string) => {
    const db = await getDBConnection();
    await createChatTableIfNotExists(db);

    await insertAllNewChats(db, data, currentPhone)
}


export const confirmMessageInStorage = async (data: { id: string, newId: string }) => {
    const db = await getDBConnection();
    await createChatTableIfNotExists(db);

    const chats = await updateChatIdWithConfirm(db, data)

    //Set first account in db to be login to app
    return chats

}

