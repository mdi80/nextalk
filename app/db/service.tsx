import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';


export const getDBConnection = async () => {
    return openDatabase({ name: 'nextalk.db', location: 'default' });
};
