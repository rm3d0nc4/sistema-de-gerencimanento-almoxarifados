import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export default class DatabaseServiceSingleton {
    private static instance: DatabaseServiceSingleton;
    private _database!: Database;

    private constructor() {}

    static getInstance(): DatabaseServiceSingleton {
        if (!DatabaseServiceSingleton.instance) {
            DatabaseServiceSingleton.instance = new DatabaseServiceSingleton();
        }
        return DatabaseServiceSingleton.instance;
    }

    async initialize(name: string): Promise<void> {
        this._database = await open({ filename: name, driver: sqlite3.Database });
        await this.createTables();
    }

    get db() {
        if (!this._database) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return this._database;
    }

    async dispose(): Promise<void> {
        if (this._database) {
            await this._database.close();
            this._database = undefined!;
        }
    }

    private async createTables(): Promise<void> {
        await this._database.exec(`
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
        `);
    }
}
