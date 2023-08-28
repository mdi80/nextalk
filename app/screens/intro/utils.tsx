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
const getAllUsersFromStorage = async (): Promise<IUserInfo[] | null> => {
    try {
        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")

        //No users in db
        if (users.length === 0) return null;

        // users.forEach(user => {
        //     if (user.lastactive) {
        //         return user
        //     }
        // });

        // //Set first account in db to be login to app
        // await updateUserLastActive(db, "users", users[0].phone, true)
        return users

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return null
}



const addUserToStorage = async (data: IUserInfo): Promise<IUserInfo | null> => {
    try {

        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")
        console.log(data);


        users.forEach(async user => {
            await updateUserLastActive(db, "users", user.phone, false)
        });

        await addUser(db, "users", data)
        await updateUserLastActive(db, "users", data.phone, true)
        return data

    } catch (error) {
        console.log(error)
        console.log("db error!")
        return null
    }
}




export { getUserFromStorage, addUserToStorage, getAllUsersFromStorage }