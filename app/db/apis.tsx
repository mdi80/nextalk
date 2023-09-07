import { IUserInfo, addUser, createTable, getDBConnection, getUsersInfo, updateUserLastActive } from "./service";


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
const getAllUsersFromStorage = async (): Promise<IUserInfo[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")


        return users

    } catch (error) {
        console.log(error)
        console.log("db error!")
    }
    return []
}


const addUserToStorage = async (data: IUserInfo): Promise<IUserInfo | null> => {
    try {

        const db = await getDBConnection();
        await createTable(db, "users");
        const users = await getUsersInfo(db, "users")


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

const changeAccountInStorage = async (targetPhone: string): Promise<IUserInfo[]> => {

    const db = await getDBConnection();
    await createTable(db, "users");
    const users = await getUsersInfo(db, "users")


    users.forEach(async user => {
        if (user.phone === targetPhone) {
            await updateUserLastActive(db, "users", user.phone, true)
        } else
            await updateUserLastActive(db, "users", user.phone, false)
    });

    return await getUsersInfo(db, "users")
    // if (userData)
    // else throw Error("No user in db with number: " + targetPhone)

}




export { getUserFromStorage, addUserToStorage, getAllUsersFromStorage, changeAccountInStorage }