import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { chatItemType } from '../components/MainScreen/ChatList/types';
import { ChatType } from '../types';

enablePromise(true);



export const createChatTableIfNotExists = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS chats(
      chat_username TEXT NOT NULL,
      id INTEGER PRIMARY KEY,
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
            where chat_username=${username}
            ORDER BY date`
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
