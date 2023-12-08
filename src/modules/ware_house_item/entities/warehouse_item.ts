import Item from "../../Item/entities/item";
import { WareHouse } from "../../ware_house/entities/warehouse";


export default class WarehouseItem {
    private _id: number;
    private _item: Item;
    private _warehouse: WareHouse;
    private _insertionDate: Date;
    private _amount: number;
    private _location: string;

    constructor({id, item, warehouse, insertionDate, amount, location} : 
        {id: number; item: Item; warehouse: WareHouse, insertionDate: Date; amount: number; location: string;}) {
        this._id = id;
        this._item = item;
        this._warehouse = warehouse;
        this._insertionDate = insertionDate;
        this._amount = amount;
        this._location = location;
    }

    get id(): number {
        return this._id;
    }
    get item(): Item {
        return this._item;
    }

    get warehouse(): WareHouse {
        return this._warehouse;
    }

    get insertionDate(): string {
        return this._insertionDate.toJSON().split('T')[0];
    }

    get amount(): number {
        return this._amount;
    }
    
    get location(): string {
        return this._location;
    }
    
    set id(newId: number){
        this._id = newId;
    }

    set item(newItem: Item) {
        this._item = newItem;
    }

    set warehouse(newWarehouse: WareHouse) {
        this._warehouse = newWarehouse;
    }

    set insertionDate(newInsertionDate: string) {
        this._insertionDate = new Date(newInsertionDate);
    }

    set amount(newAmount: number) {
        this._amount = newAmount;
    }
    
    set location(newLocation: string) {
        this._location = newLocation;
    }
    
    toList(): Array<any> {
        let objectList: Array<any> = new Array();
        objectList[0] = this.item.id;
        objectList[1] = this.warehouse.id;
        objectList[2] = this.insertionDate;
        objectList[3] = this.amount;
        objectList[4] = this.location;
        objectList[5] = 'NULL';
        return objectList;
    }
    
    static fromMap(map: Map<string, any>): WarehouseItem {
        return new WarehouseItem({
            id: map.get('WARE_ITEM_ID'),
            item: map.get('ITEM_ID'),
            warehouse: map.get('WAREHOUSE_ID'),
            insertionDate: new Date(<string> map.get('INSERTION_DATE')), 
            amount: map.get('AMOUNT'), 
            location: map.get('LOCATION'),
        });
    }

    toString(): string {
        let string = 
        `Id: ${this.id}                         Item: ${this.item}
         Almoxarifado: ${this.warehouse}        Data de Inserção: ${this.insertionDate}
         Quantidade: ${this.amount}             Localização: ${this._location}`

        return string;
    }

}