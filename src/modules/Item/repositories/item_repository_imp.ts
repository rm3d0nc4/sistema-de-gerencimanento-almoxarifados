
import ItemNotFoundError from '../../../errors/item_error_not_found';
import DatabaseServiceSingleton from '../../../service/database_service';
import Item from '../entities/item';
import './item_repository.dart';
import { ItemDeletableRepository,ItemFindableAllRepository,  ItemFindableRepository, ItemInsertableRepository, ItemUpdatableRepository } from './item_repository';

export class ItemRepository implements ItemDeletableRepository,ItemFindableAllRepository,  ItemFindableRepository, ItemInsertableRepository, ItemUpdatableRepository{
    private _database: DatabaseServiceSingleton


    constructor(database: DatabaseServiceSingleton){
        this._database= database
    }


   async find(id: number): Promise<Item> {

        const data: Object | undefined = await this._database.db.get(`SELECT * FROM ITEM WHERE ITEM_ID = ${id}`)
        if(data == undefined) {
            throw new ItemNotFoundError('Item não encontrado');
        } 

        const item: Item = Item.fromObject(data);
        return item; 
        
    }

    async findAll(): Promise<Item[]> {
        let data: Object | undefined = await this._database.db.all(`SELECT * FROM ITEM`)
        if(data == undefined) {
           return []
        } 
        let values = <Array<Object>> data;

        let itemsList: Array<Item> = values.map((value, index) => {
             return Item.fromObject(value);
        })
        
        return itemsList;
        
    }


   async delete(id: number): Promise<void> {
        await this.find(id);
        await this._database.db.exec(`DELETE FROM ITEM WHERE ITEM_ID = ${id}`);
    }
  
   async insert(item: Item): Promise<void> {
    await this._database.db.exec(`INSERT INTO ITEM (DESCRIPTION) VALUES ('${item.description}')`);
    }
   async update(id: number, newItem: Item): Promise<void> {
        await this.find(id)
        await this._database.db.exec(`
        UPDATE ITEM SET DESCRIPTION = '${newItem.description}' WHERE ITEM_ID = ${id}
    `);
    }

    
}