import { IUserInfo, createTable, getDBConnection, getUsersInfo, updateUserLastActive } from "../../db/service";


const getUserFromStorage = async (): Promise<IUserInfo | null> => {
    try {
        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")

        //No users in db
        if (users.length === 0) return null;

        users.forEach(user => {
            if (user.lastactive) {
                return user
            }
        });

        //Set first account in db to be login to app
        await updateUserLastActive(db, "users", users[0].phone, true)
        return users[0]

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return null
}




export { getUserFromStorage }