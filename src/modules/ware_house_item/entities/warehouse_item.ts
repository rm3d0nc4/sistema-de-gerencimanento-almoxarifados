import Item from "../../Item/entities/item";
import { WareHouse } from "../../ware_house/entities/warehouse";
import { IWareHouseItemValidation } from "../validations/i_warehouse_item_validation";


export default abstract class WarehouseItem {
    protected _id: number;
    private _item: Item;
    private _warehouse: WareHouse;
    private _insertionDate: Date;
    private _amount: number;
    private _location: string;
    protected _validations: IWareHouseItemValidation[] = [];

    constructor({ id, item, warehouse, insertionDate, amount, location }:
        { id: number; item: Item; warehouse: WareHouse, insertionDate: Date; amount: number; location: string; }) {
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

    set id(newId: number) {
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


    validate(): void {
        this.setValidations();
        for (let validation of this._validations) {
            validation.validate(this);
        }
    }

    protected abstract setValidations(): void

    abstract toList(): Array<any>

    abstract toString(): string

    abstract getStringValuesToSql(): string

    // abstract fromMap(map: Map<string, any>): WarehouseItem


}