import { Perishable } from "../entities/perishable";
import WarehouseItem from "../entities/warehouse_item";
import { IWareHouseItemValidation } from "./i_warehouse_item_validation";

export class IfPerishableIsNotExpired implements IWareHouseItemValidation {
    validate(wareHouseItem: Perishable): void {
        if (!(wareHouseItem.expirationDate.getTime() < Date.now())) {
            throw new Error('Perecível está vencido!');
        }
    }
}

export class IfWarehouseItemHasValidLocation implements IWareHouseItemValidation {
    validate(wareHouseItem: WarehouseItem): void {

        if (!wareHouseItem.location.startsWith('WI')) {
            throw new Error('Localização inválida!');
        }
    }

}