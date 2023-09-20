import { OtherUserType } from "../types";
import { createChatTableIfNotExists } from "./chat-service";
import { getDBConnection } from "./service";
import { OtherUserTypeDB, addAllOtherUserFor, addOtherUserFor, createOtherusersTableIfNotExists, getAllOtherUsersOf } from "./users-service";

export const getOtherUsersFromStorage = async (currentUsername: string): Promise<OtherUserTypeDB[]> => {
    try {
        const db = await getDBConnection();
        await createOtherusersTableIfNotExists(db);
        const users = await getAllOtherUsersOf(db, currentUsername)

        return users

    } catch (error) {
        console.error(error)
        console.error("db error!")
    }
    return []
}



export const addOtherUsersIfNotExists = async (currentUsername: string, data: OtherUserType): Promise<void> => {
    try {
        const db = await getDBConnection();
        await createOtherusersTableIfNotExists(db);
        const users = await getAllOtherUsersOf(db, currentUsername)
        if (users.find(item => item.username === data.username)) return
        const db_data: OtherUserTypeDB = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            for_user: currentUsername,
            imagePath: data.imagePath,
            lastActiveDateTime: data.lastActiveDateTime === "online" ? new Date().getTime() : data.lastActiveDateTime,
            phone: data.phone
        }

        await addOtherUserFor(db, db_data)

    } catch (error) {
        console.error(error)
        console.error("db error!")
        throw error
    }
}


export const addAllOtherUsersIfNotExists = async (currentUsername: string, usersdata: OtherUserType[]): Promise<void> => {
    try {
        const db = await getDBConnection();
        await createOtherusersTableIfNotExists(db);
        const users = await getAllOtherUsersOf(db, currentUsername)
        const unsavedUsers: OtherUserTypeDB[] = []
        usersdata.map(user => {

            if (users.find(item => item.username === user.username)) return

            const db_data: OtherUserTypeDB = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                for_user: currentUsername,
                imagePath: user.imagePath,
                lastActiveDateTime: user.lastActiveDateTime === "online" ? new Date().getTime() : user.lastActiveDateTime,
                phone: user.phone
            }

            unsavedUsers.push(db_data)

        })
        if (unsavedUsers.length === 0) return
        await addAllOtherUserFor(db, unsavedUsers)
    } catch (error) {
        console.error(error)
        console.error("db error!")
        throw error
    }
}