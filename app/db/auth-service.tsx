import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);


export const createUserTableIfNotExists = async (db: SQLiteDatabase, tableName: string) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        phone TEXT NOT NULL PRIMARY KEY,
        token TEXT NOT NULL,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username TEXT NOT NULL,
        lastactive BOOLEAN
      );`;

    await db.executeSql(query);
};


export interface IUserInfo {
    token: string
    phone: string
    firstname: string
    lastname: string
    username: string
    lastactive: boolean
}
export interface IUpdateUserInfo {
    token?: string
    firstname?: string
    lastname?: string
    username?: string
    lastactive?: boolean
}




export const getUsersInfo = async (db: SQLiteDatabase, userTableName: string): Promise<IUserInfo[]> => {
    try {

        const results = await db.executeSql(`SELECT * FROM ${userTableName}`);
        const users: IUserInfo[] = []
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                result.rows.item(index)['lastactive'] = result.rows.item(index)['lastactive'] === 1
                users.push(result.rows.item(index))
            }
        });



        return users;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get users!');
    }
};

export const addUser = async (db: SQLiteDatabase, userTableName: string, userInfo: IUserInfo) => {

    let insertQuery =
        `INSERT INTO ${userTableName}(phone, token,firstname,lastname,lastactive,username) values` +
        `(
            '${userInfo.phone}',
             '${userInfo.token}',
             '${userInfo.firstname}',
             '${userInfo.lastname}',
             '${userInfo.lastactive}',
             '${userInfo.username}');`;

    return await db.executeSql(insertQuery);
};
export const updateUserLastActive = async (db: SQLiteDatabase, userTableName: string, phone: string, acitve: boolean) => {

    const updateQuery =
        `UPDATE ${userTableName} SET lastactive=` +
        `${acitve ? 'TRUE' : 'FALSE'} WHERE phone='${phone}';`

    await db.executeSql(updateQuery);
};

export const deleteUser = async (db: SQLiteDatabase, userTableName: string, userToken: string) => {
    const deleteQuery = `DELETE from ${userTableName} where token = '${userToken}' `;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase, userTableName: string) => {
    const query = `drop table ${userTableName} `;

    await db.executeSql(query);
};
