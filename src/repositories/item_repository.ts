
import { Database } from "sqlite";
import ItemNotFoundError from "../errors/item_error_not_found";
import Item from "../models/item";
import { IItemRepository } from "../interfaces/item_repository_interface";

export default class ItemRepository implements IItemRepository {
    _database: Database;

    constructor(database: Database) {
        this._database = database;
    }

    async insertItem(item: Item): Promise<void> {
        await this._database.exec(`INSERT INTO ITEM (DESCRIPTION) VALUES ('${item.description}')`);
    }
    
    async findItemById(id: number): Promise<Item> {
        let data: Object | undefined = await this._database.get(`SELECT * FROM ITEM WHERE ITEM_ID = ${id}`)
        if(data == undefined) {
            throw new ItemNotFoundError('Item não encontrado');
        } else {
            let item: Item = Item.fromObject(data);
            return item; 
        }
    }

    async findAllItems(): Promise<Item[]> {
        let data: Object | undefined = await this._database.all(`SELECT * FROM ITEM`)
        if(data == undefined) {
            throw new ItemNotFoundError('Ainda não existem itens');
        } else {
            let values = <Array<Object>> data;

            let itemsList: Array<Item> = values.map((value, index) => {
                return Item.fromObject(value);
            })
            return itemsList;
        }
    }

    async updateItem(id: number, item: Item): Promise<void> {
        await this._database.exec(`
            UPDATE ITEM SET DESCRIPTION = '${item.description}' WHERE ITEM_ID = ${id}
        `);
    }

    async deleteItem(id: number): Promise<void> {
        await this.findItemById(id);
        await this._database.exec(`DELETE FROM ITEM WHERE ITEM_ID = ${id}`);
    }
    
}