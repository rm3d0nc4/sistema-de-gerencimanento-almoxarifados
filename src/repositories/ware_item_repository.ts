import { Database } from "sqlite";
import IWareHouseRepository from "../interfaces/warehouse_repository_interface";
import IWareItemRepository from "../interfaces/ware_item_repository_interface";
import Item from "../models/item";
import { WareHouse } from "../models/warehouse";
import WarehouseItem from "../models/warehouse_item";

export default class WareItemRepository implements IWareItemRepository {
    _database: Database;
    constructor(database: Database) {
        this._database = database;
    }
    
    private async _findItemFromWareItem(id: string): Promise<Item> {
        let data: Object | undefined = await this._database.get(`SELECT * FROM ITEM WHERE ITEM_ID = ${id}`)
        if(data == undefined) {
            throw new Error('não achei'); // Lançar Exceção
        } else {
            let item: Item = Item.fromObject(data);
            return item; 
        }
    }

    private async _findWarehouseFromWareItem(id: string) : Promise<WareHouse> {
        let data: Object | undefined = await this._database.get(`SELECT * FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`)
        if(data == undefined) {
            throw new Error('não achei'); // Lançar Exceção
        } else {
            let wareHouse: WareHouse = WareHouse.fromObject(data);
            return wareHouse; 
        }
    }


    private async _changeObjectToMap(value: Object): Promise<Map<string, any>> {
        let map: Map<string, any> = new Map(Object.entries(value));
        let item: Item = await this._findItemFromWareItem(map.get('ITEM_ID'));
        let wareHouse: WareHouse = await this._findWarehouseFromWareItem(map.get('WAREHOUSE_ID'));
        map.set('ITEM_ID', item);
        map.set('WAREHOUSE_ID', wareHouse);
        return map;
    }

    async findAllWareItems(): Promise<WarehouseItem[]> {
        let data: Object | undefined = await this._database.all(`SELECT * FROM WAREHOUSE_ITEM`);
        if(data == undefined) {
            throw new Error('não achei'); // Lançar Exceção
        } else {
            let values = <Array<Object>> data;
            let itemsList: WarehouseItem[] = [];

            for (let value of values) {
                let map: Map<string, any> = await this._changeObjectToMap(value);
                itemsList.push(WarehouseItem.fromMap(map));
            }
            return itemsList;
        }
    }


    async findWareItemById(id: number): Promise<WarehouseItem> {
        let data: Object | undefined = await this._database.get(`SELECT * FROM WAREHOUSE_ITEM WHERE WARE_ITEM_ID = ${id}`)
        if(data == undefined) {
            throw new Error('não achei'); // Lançar Exceção
        } else {
            let map: Map<string, any> = await this._changeObjectToMap(data);
            let wareItem: WarehouseItem = WarehouseItem.fromMap(map);
            return wareItem; 
        }
    }

    async insertWareItem(wareHouseItem: WarehouseItem): Promise<void> {
        await this._database.exec(`INSERT INTO WAREHOUSE_ITEM (
            ITEM_ID, 
            WAREHOUSE_ID, 
            INSERTION_DATE, 
            AMOUNT, 
            LOCATION, 
            EXPIRATION_DATE
            ) VALUES (
                ${wareHouseItem.item.id}, 
                ${wareHouseItem.warehouse.id}, 
                '${wareHouseItem.insertionDate}', 
                ${wareHouseItem.amount}, 
                '${wareHouseItem.location}', 
                NULL)`);
    }
    async updateWareItem(id: number, wareHouseItem: WarehouseItem): Promise<void> {
        await this._database.run(`UPDATE WAREHOUSE_ITEM SET (
            ITEM_ID,
            WAREHOUSE_ID,
            INSERTION_DATE,
            AMOUNT,
            LOCATION,
            EXPIRATION_DATE ) = (
                ${wareHouseItem.item.id}, 
                ${wareHouseItem.warehouse.id}, 
                '${wareHouseItem.insertionDate}', 
                ${wareHouseItem.amount}, 
                '${wareHouseItem.location}', 
                NULL
            ) WHERE WARE_ITEM_ID = ${id}`);
    }

    async deleteWareItem(id: number): Promise<void> {
        await this._database.exec(`DELETE FROM WAREHOUSE_ITEM WHERE WARE_ITEM_ID = ${id}`);
    }
    
}