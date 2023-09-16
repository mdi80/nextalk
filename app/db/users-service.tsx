import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { chatItemType } from '../components/MainScreen/ChatList/types';
import { OtherUserType } from '../types';

enablePromise(true);


export type OtherUserTypeDB = {
    for_user: string
    firstname: string
    lastname: string
    username: string
    phone: string
    lastActiveDateTime: number
    imagePath: string | null
}

export const createOtherusersTableIfNotExists = async (db: SQLiteDatabase) => {

    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS Otherusers(
      username TEXT,
      for_user TEXT,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      phone TEXT NOT NULL,
      lastActiveDateTime INTEGER,
      imagePath TEXT,
      PRIMARY KEY (username,for_user),
      UNIQUE (username,phone)
    );`;

    await db.executeSql(query);
};

export const getAllOtherUsersOf = async (db: SQLiteDatabase, currentUsername: string): Promise<OtherUserTypeDB[]> => {

    const query = `SELECT * FROM Otherusers where for_user='${currentUsername}'`

    const results = await db.executeSql(query);
    console.log("here    ");

    const users: OtherUserTypeDB[] = []

    results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            users.push(result.rows.item(index))
        }
    })

    console.log(users);
    return users
};
export const addOtherUserFor = async (db: SQLiteDatabase, data: OtherUserTypeDB): Promise<void> => {

    const query = `INSERT INTO Otherusers VALUES` +
        `(
        '${data.username}',
         '${data.for_user}',
         '${data.firstname}',
         '${data.lastname}',
         '${data.phone}',
         '${data.lastActiveDateTime}',
         '${data.imagePath}');`;


    console.log("log:" + await db.executeSql(query))
};

export const addAllOtherUserFor = async (db: SQLiteDatabase, data: OtherUserTypeDB[]): Promise<void> => {

    let query = `INSERT INTO Otherusers VALUES`;

    data.forEach(item => {
        query += `(
        '${item.username}',
         '${item.for_user}',
         '${item.firstname}',
         '${item.lastname}',
         '${item.phone}',
         '${item.lastActiveDateTime}',
         '${item.imagePath}');`;
    })
    query = query.substring(0, query.length - 1) + ";"
    await db.executeSql(query);

};


