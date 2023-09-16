import { OtherUserType } from "../types";
import { createChatTableIfNotExists } from "./chat-service";
import { getDBConnection } from "./service";
import { OtherUserTypeDB, createOtherusersTableIfNotExists, getAllOtherUsersOf } from "./users-service";

export const getOtherUsersFromStorage = async (currentUsername: string): Promise<OtherUserTypeDB[]> => {
    try {
        const db = await getDBConnection();
        await createOtherusersTableIfNotExists(db);
        const users = await getAllOtherUsersOf(db, currentUsername)

        return users

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return []
}