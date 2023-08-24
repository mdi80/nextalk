import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);


export const getDBConnection = async () => {
    return openDatabase({ name: 'nextalk.db', location: 'default' });
};


export const createTable = async (db: SQLiteDatabase, tableName: string) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        phone TEXT NOT NULL PRIMARY KEY,
        token TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        username TEXT,
        lastactive BOOLEAN
      );`;

    await db.executeSql(query);
};


export interface IUserInfo {
    token: string
    phone: string
    first_name: string
    last_name: string
    username?: string
    lastactive?: boolean
}
export interface IUpdateUserInfo {
    token?: string
    first_name?: string
    last_name?: string
    username?: string
    lastactive?: boolean
}



export const getUsersInfo = async (db: SQLiteDatabase, userTableName: string): Promise<IUserInfo[]> => {
    try {

        const results = await db.executeSql(`SELECT * FROM ${userTableName}`);
        const users: IUserInfo[] = []
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
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
    const insertQuery =
        `INSERT INTO ${userTableName}(phone, token,first_name,last_name) values` +
        `(
            '${userInfo.phone}',
             '${userInfo.token}',
             '${userInfo.first_name}',
             '${userInfo.last_name}')`;

    return await db.executeSql(insertQuery);
};
export const updateUserLastActive = async (db: SQLiteDatabase, userTableName: string, phone: string, acitve: boolean) => {

    const updateQuery =
        `UPDATE ${userTableName} SET lastactive=` +
        `${acitve ? 'TRUE' : 'FALSE'} WHERE phone='${phone}';`

    await db.executeSql(updateQuery);
};

export const deleteUser = async (db: SQLiteDatabase, userTableName: string, userPhon: string) => {
    const deleteQuery = `DELETE from ${userTableName} where phone = ${userPhon} `;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase, userTableName: string) => {
    const query = `drop table ${userTableName} `;

    await db.executeSql(query);
};
