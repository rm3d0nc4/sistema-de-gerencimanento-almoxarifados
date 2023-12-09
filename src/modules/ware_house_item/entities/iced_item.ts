import Item from "../../Item/entities/item";
import WarehouseItem from "./warehouse_item";
import { WareHouse } from "../../ware_house/entities/warehouse";
import { IfPerishableIsNotExpired, IfWarehouseItemHasValidLocation } from "../validations/warehouse_item_validations";


export class IcedItem extends WarehouseItem {
    private _minumumTemperature: number;
    private _maximumTemperature: number;

    constructor({ id, item, warehouse, insertionDate, amount, location, minumumTemperature, maximumTemperature }:
        { id: number; item: Item; warehouse: WareHouse, insertionDate: Date; amount: number; location: string; minumumTemperature: number; maximumTemperature: number }) {
        super({ id, item, warehouse, insertionDate, amount, location })
        this._minumumTemperature = minumumTemperature;
        this._maximumTemperature = maximumTemperature;
    }

    get minumumTemperature(): number {
        return this._minumumTemperature;
    }
    get maximumTemperature(): number {
        return this._maximumTemperature;
    }

    set setMinumumTemperature(newMinumumTemperature: number) {
        this._minumumTemperature = newMinumumTemperature;
    }

    set setMaximumTemperature(newMaximumTemperature: number) {
        this._maximumTemperature = newMaximumTemperature;
    }

    static fromMap(map: Map<string, any>): WarehouseItem {
        return 
    }

    toString(): string {
        let string =
            `Id: ${this.id}                         Item: ${this.item}
                    Almoxarifado: ${this.warehouse}        Data de inserção ${this.insertionDate}
                    Quantidade: ${this.amount}             Localização: ${this.location}
                    Temperatura Mínima: ${this.minumumTemperature}          Temperatura Máxima: ${this._maximumTemperature}`;

        return string;
    }

    getStringValuesToSql(): string {
        return `(
                        ${this.item.id},
                        ${this.warehouse.id},
                        '${this.insertionDate}',
                        ${this.amount},
                        '${this.location}',
                        ${this.minumumTemperature},
                        ${this.maximumTemperature}
                        )`;
    }


    protected setValidations() {
        this._validations.push(
            new IfWarehouseItemHasValidLocation(),
        )
    }

    validate(): void {
        this.setValidations();
        for (let validation of this._validations) {
            validation.validate(this);
        }
    }

    toList(): any[] {
        let objectList: Array<any> = new Array();
        objectList[0] = this.item.id;
        objectList[1] = this.warehouse.id;
        objectList[2] = this.insertionDate;
        objectList[3] = this.amount;
        objectList[4] = this.location;
        objectList[5] = this.minumumTemperature;
        objectList[6] = this.maximumTemperature;
        return objectList;
    }
}