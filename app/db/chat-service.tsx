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
      reply INTEGER,
      current_user_phone TEXT NOT NULL,
      FOREIGN KEY (current_user_phone) REFERENCES users(phone)
    );`;

    await db.executeSql(query);
};



export const loadChatsFromUsername = async (db: SQLiteDatabase, username: string, currentPhone: string): Promise<ChatType[]> => {
    try {

        const results = await db.executeSql(
            `SELECT 
                id,to_user,from_user,message,date,saved,seen,reply
            FROM chats
            WHERE chat_username='${username}' AND current_user_phone='${currentPhone}'
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


export const loadUnsendsChatsFromUsername = async (db: SQLiteDatabase, currentPhone: string): Promise<ChatType[]> => {
    try {

        const results = await db.executeSql(
            `SELECT 
                id,to_user,from_user,message,date,saved,seen,reply
            FROM chats
            WHERE saved=0 AND current_user_phone='${currentPhone}'
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

export const insertNewChat = async (db: SQLiteDatabase, username: string, data: ChatType, currentPhone: string): Promise<void> => {
    try {
        if (await checkChatExists(db, data.id)) {
            console.error(`Insert new: Chat Already exists! Skiping (${data.id})`);
            return
        }
        await db.executeSql(
            `INSERT INTO chats(chat_username,id,to_user,from_user,message,date,current_user_phone) 
            VALUES (
                '${username}',
                '${data.id}',
                '${data.to_user}',
                '${data.from_user}',
                '${data.message}',
                ${Math.floor(data.date * 1000)},
                '${currentPhone}'
            );`
        );

    } catch (error) {
        console.error(error);
        throw Error('Failed to insert chat!');
    }
};

export const insertAllNewChats = async (db: SQLiteDatabase, data: ChatType[], currentPhone: string): Promise<void> => {
    try {

        const query = "INSERT INTO chats(chat_username,id,to_user,from_user,message,date,current_user_phone) VALUES"
        let rows = ""
        await Promise.all(
            data.map(async c => {
                if (await checkChatExists(db, c.id)) {
                    console.error(`Insert All: Chat Already exists! Skiping (${c.id})`);
                } else {
                    rows += `(
                    '${c.from_user}',
                    '${c.id}',
                    '${c.to_user}',
                    '${c.from_user}',
                    '${c.message}',
                    ${Math.floor(c.date * 1000)},
                    '${currentPhone}'
                ),`
                }
            })
        )
        if (rows === "") return
        rows = rows.substring(0, rows.length - 1) + ";"

        await db.executeSql(query + rows);

    } catch (error) {
        console.error(error);
        throw Error('Failed to insert chat!');
    }
};



export const updateChatIdWithConfirm = async (db: SQLiteDatabase, data: { id: string, newId: string }): Promise<void> => {
    try {

        if (!await checkChatExists(db, data.id)) {
            console.error(`Update db: Chat with id ${data.id} Dose not exists!`);
        }
        await db.executeSql(`UPDATE chats 
        SET id='${data.newId}',saved=1
        WHERE id='${data.id}';`);

    } catch (error) {
        console.error(error);
        throw Error('Failed to update chat!');
    }
};


export const checkChatExists = async (db: SQLiteDatabase, chatid: string): Promise<boolean> => {

    const query = `SELECT id FROM chats WHERE id='${chatid}'`;
    const res = await db.executeSql(query);
    return res[0].rows.length >= 1;
}