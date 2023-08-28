import { IUserInfo, getDBConnection, getUsersInfo } from "../../db/service";

const getUsersFromStorage = async (): Promise<IUserInfo[]> => {
    try {
        const db = await getDBConnection();
        const users = await getUsersInfo(db, "users")
        //No users in db
        // if (!users || users.length === 0) return null;

        return users

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return []
}

export { getUsersFromStorage }