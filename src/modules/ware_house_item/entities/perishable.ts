import Item from "../../Item/entities/item";
import WarehouseItem from "../../ware_house/entities/warehouse_item";
import { WareHouse } from "./warehouse";


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
    
    get expirationDateStr(): string {
        return  this._expirationDate.toJSON().split('T')[0];
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
            expirationDate: new Date(<string>map.get('EXPIRATION_DATE'))
        });
    }

    toString(): string {
        let string = 
        `Id: ${this.id}                         Item: ${this.item}
         Almoxarifado: ${this.warehouse}        Data de inserção ${this.insertionDate}
         Quantidade: ${this.amount}             Localização: ${this.location}
         Data de Expiração: ${this.expirationDateStr}`;
        
        return string;
    }
    
}