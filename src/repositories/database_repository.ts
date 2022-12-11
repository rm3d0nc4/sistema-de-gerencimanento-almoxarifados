import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3'

export default class DatabaseRepository {
    private _database!: Database;
    
    static async initialize(name: string): Promise<DatabaseRepository>{
        const repository: DatabaseRepository = new DatabaseRepository();
        repository._database = await open({filename: name, driver: sqlite3.Database});

        await repository._database.exec( `
        CREATE TABLE IF NOT EXISTS ITEM (
            ITEM_ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            DESCRIPTION VARCHAR(30) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS WAREHOUSE (
            WAREHOUSE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            NAME VARCHAR(15) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS WAREHOUSE_ITEM (
            WARE_ITEM_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            ITEM_ID INTEGER NOT NULL REFERENCES ITEM,
            WAREHOUSE_ID INTEGER NOT NULL REFERENCES WAREHOUSE,
            INSERTION_DATE DATE NOT NULL, 
            AMOUNT INT NOT NULL, 
            LOCATION VARCHAR(15) NOT NULL, 
            EXPIRATION_DATE DATE
        );
        ` );

        return repository;
    }

    get db() {
        return this._database;
    }

    async dispose(): Promise<void> {
        await  this._database.close();
    }
}
