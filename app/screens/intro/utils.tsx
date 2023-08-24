import { IUserInfo, addUser, createTable, getDBConnection, getUsersInfo, updateUserLastActive } from "../../db/service";


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


const addUserToStorage = async (data: IUserInfo): Promise<IUserInfo | null> => {
    try {
        console.log("here1");

        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")
        console.log("here2");


        users.forEach(async user => {
            await updateUserLastActive(db, "users", user.phone, false)
        });
        console.log("here3");

        await addUser(db, "users", data)
        console.log("here4");

        return data

    } catch (error) {
        console.log(error)
        console.log("db error!")
        return null
    }
}




export { getUserFromStorage, addUserToStorage }