import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { chatItemType } from '../components/MainScreen/ChatList/types';
import { ChatType } from '../types';

enablePromise(true);



export const createChatTableIfNotExists = async (db: SQLiteDatabase) => {
    // create table if not exists

    const query = `CREATE TABLE IF NOT EXISTS chats(
      chat_username TEXT NOT NULL,
      id TEXT PRIMARY KEY,
      to_user TEXT NOT NULL,
      from_user TEXT NOT NULL,
      message TEXT NOT NULL,
      date INTEGER NOT NULL,
      saved BOOLEAN DEFAULT 0,
      seen BOOLEAN DEFAULT 0,
      reply INTEGER
    );`;

    await db.executeSql(query);
};



export const loadChatsFromUsername = async (db: SQLiteDatabase, username: string): Promise<ChatType[]> => {
    try {

        const results = await db.executeSql(
            `SELECT 
                id,to_user,from_user,message,date,saved,seen,reply
            FROM chats
            where chat_username='${username}'
            ORDER BY date DESC;`
        );
        const chats: ChatType[] = []
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                chats.push(result.rows.item(index))
            }
        });
        return chats;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get users!');
    }
};

export const insertNewChat = async (db: SQLiteDatabase, username: string, data: ChatType): Promise<void> => {
    try {


        await db.executeSql(
            `INSERT INTO chats(chat_username,id,to_user,from_user,message,date) 
            VALUES (
                '${username}',
                '${data.id}',
                '${data.to_user}',
                '${data.from_user}',
                '${data.message}',
                ${Math.floor(data.date * 1000)}
            );`
        );

    } catch (error) {
        console.error(error);
        throw Error('Failed to insert chat!');
    }
};

export const insertAllNewChats = async (db: SQLiteDatabase, data: ChatType[]): Promise<void> => {
    try {

        let query = "INSERT INTO chats(chat_username,id,to_user,from_user,message,date) VALUES"

        data.forEach(c => {
            query += `(
                '${c.from_user}',
                '${c.id}',
                '${c.to_user}',
                '${c.from_user}',
                '${c.message}',
                ${Math.floor(c.date * 1000)}
            ),`
        })

        query = query.substring(0, query.length - 1) + ";"
        console.log(query);

        await db.executeSql(query);

    } catch (error) {
        console.error(error);
        throw Error('Failed to insert chat!');
    }
};



export const updateChatIdWithConfirm = async (db: SQLiteDatabase, data: { id: string, newId: string }): Promise<void> => {
    try {


        await db.executeSql(`UPDATE chats 
        SET id='${data.newId}',saved=1
        WHERE id='${data.id}';`);

    } catch (error) {
        console.error(error);
        throw Error('Failed to update chat!');
    }
};
