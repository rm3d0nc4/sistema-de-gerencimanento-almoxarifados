import PerishableExpiredError from "../../../errors/perishable_expired_error";
import WarehouseItemNotFoundError from "../../../errors/ware_item_not_found_error";
import DatabaseServiceSingleton from "../../../service/database_service";
import Item from "../../Item/entities/item";
import { Perishable } from "../../ware_house/entities/perishable";
import { WareHouse } from "../../ware_house/entities/warehouse";
import WarehouseItem from "../entities/warehouse_item";

import { WareHouseItemDeletableRepository, WareHouseItemFindableRepository , WareHouseItemFindableAllRepository, WareHouseItemInsertableRepository, WareHouseItemUpdatableRepository} from "./ware_house_item_repository";

export class WareHouseItemRepositoryImp implements WareHouseItemDeletableRepository, WareHouseItemFindableRepository, WareHouseItemUpdatableRepository, WareHouseItemInsertableRepository, WareHouseItemFindableAllRepository {
    private _database: DatabaseServiceSingleton


    constructor(database: DatabaseServiceSingleton){
        this._database= database
    }

    private async _findItemFromWareItem(id: string): Promise<Item> {
        const data: Object | undefined = await this._database.db.get(`SELECT * FROM ITEM WHERE ITEM_ID = ${id}`)
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Item não cadastrado'); // Lançar Exceção
        }
        const item: Item = Item.fromObject(data);
        return item; 
        
    }

    private async _findWarehouseFromWareItem(id: string) : Promise<WareHouse> {
        const data: Object | undefined = await this._database.db.get(`SELECT * FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`)
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Almoxarifado não cadastrado');
        } 
        const wareHouse: WareHouse = WareHouse.fromObject(data);
        return wareHouse; 
        
    }


    private async _changeObjectToMap(value: Object): Promise<Map<string, any>> {
        const map: Map<string, any> = new Map(Object.entries(value));
        const item: Item = await this._findItemFromWareItem(map.get('ITEM_ID'));
        const wareHouse: WareHouse = await this._findWarehouseFromWareItem(map.get('WAREHOUSE_ID'));
        map.set('ITEM_ID', item);
        map.set('WAREHOUSE_ID', wareHouse);
        return map;
    }

    async findWareItemByProperty(property: string, value: any): Promise<WarehouseItem> {
        let data: Object | undefined = await this._database.db.get(`SELECT * FROM WAREHOUSE_ITEM WHERE ${property} = '${value}'`)
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Lote não encontrado');
        } 
        let map: Map<string, any> = await this._changeObjectToMap(data);
        let item: WarehouseItem;
            if(map.get('EXPIRATION_DATE') != 'null') {
                item = <Perishable> Perishable.fromMap(map);
            } else {
                item = WarehouseItem.fromMap(map);
            }
            let wareItem: WarehouseItem = item;
        return wareItem; 
        
    }


   async delete(id: number): Promise<void> {
        await this.findWareItemByProperty('WARE_ITEM_ID', id);
        await this._database.db.exec(`DELETE FROM WAREHOUSE_ITEM WHERE WARE_ITEM_ID = ${id}`);
    }
   async findAllByProperties(property: string, value: any): Promise<WarehouseItem[]> {
        let data: Object | undefined = await this._database.db.all(`SELECT * FROM WAREHOUSE_ITEM WHERE ${property} = ${value}`);
        if(data == undefined || (<Array<any>>data).length === 0) {
            throw new WarehouseItemNotFoundError('Lotes não encontrados'); // Lançar Exceção
        } 
        let values = <Array<Object>> data;
        let itemsList: WarehouseItem[] = [];

        for (let value of values) {
            let map: Map<string, any> = await this._changeObjectToMap(value);
            let item: WarehouseItem;
            if(map.get('EXPIRATION_DATE') != 'null') {
                item = <Perishable> Perishable.fromMap(map);
            } else {
                item = WarehouseItem.fromMap(map);
            }
            itemsList.push(item);
        
        return itemsList;
        }
    }

    async update(id: number, newItem: WarehouseItem): Promise<void> {
        
        await this._database.db.run(`UPDATE WAREHOUSE_ITEM SET (
            ITEM_ID,
            WAREHOUSE_ID,
            INSERTION_DATE,
            AMOUNT,
            LOCATION,
            EXPIRATION_DATE ) = (
                ${newItem.item.id}, 
                ${newItem.warehouse.id}, 
                '${newItem.insertionDate}', 
                ${newItem.amount}, 
                '${newItem.location}', 
                '${newItem instanceof Perishable ? newItem.expirationDate : null}'
            ) WHERE WARE_ITEM_ID = ${id}`);
    }
   async insert(item: WarehouseItem): Promise<void> {
        if(item instanceof Perishable) {
            if ((<Perishable> item).expirationDate.getTime() < Date.now()) {
                throw new PerishableExpiredError('Falha ao inserir: perecível está vencido!');
            }
        }
        
        await this._database.db.exec(`INSERT INTO WAREHOUSE_ITEM (
            ITEM_ID, 
            WAREHOUSE_ID, 
            INSERTION_DATE, 
            AMOUNT, 
            LOCATION, 
            EXPIRATION_DATE
            ) VALUES (
                ${item.item.id}, 
                ${item.warehouse.id}, 
                '${item.insertionDate}', 
                ${item.amount}, 
                '${item.location}', 
                '${item instanceof Perishable ? item.expirationDate : null}')`);
    }


   async findAll(): Promise<WarehouseItem[]> {
        let data: Object | undefined = await this._database.db.all(`SELECT * FROM WAREHOUSE_ITEM`);
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Nenhum WareItem foi cadastrado ainda'); // Lançar Exceção
        } 
        let values = <Array<Object>> data;
        let itemsList: WarehouseItem[] = [];

        for (let value of values) {
            let map: Map<string, any> = await this._changeObjectToMap(value);
            let item: WarehouseItem;
            if(map.get('EXPIRATION_DATE') != 'null') {
                item = <Perishable> Perishable.fromMap(map);
            } else {
                item = WarehouseItem.fromMap(map);
            }
            itemsList.push(item);
        }
        return itemsList;
        
    }


}