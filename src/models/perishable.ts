import Item from "./item";
import { WareHouse } from "./warehouse";
import WarehouseItem from "./warehouse_item";

export class Perishable extends WarehouseItem {
    private _expirationDate: Date;
    
    constructor({id, item, warehouse, insertionDate, amount, location, expirationDate} : 
        {id: number; item: Item; warehouse: WareHouse, insertionDate: Date; amount: number; location: string; expirationDate: Date}) {
        super({id, item, warehouse, insertionDate, amount, location})
        this._expirationDate = expirationDate;
    }

    get expirationDate(): Date {
        return this._expirationDate;
    }

    set setExpirationDate(date: Date) {
        this._expirationDate = date;
    }


    static fromMap(map: Map<string, any>): WarehouseItem {
        return new Perishable({
            id: map.get('WARE_ITEM_ID'),
            item: map.get('ITEM_ID'),
            warehouse: map.get('WAREHOUSE_ID'),
            insertionDate: new Date(<string> map.get('INSERTION_DATE')), 
            amount: map.get('AMOUNT'), 
            location: map.get('LOCATION'),
            expirationDate: map.get('EXPIRATION_DATE')
        });
    }

}