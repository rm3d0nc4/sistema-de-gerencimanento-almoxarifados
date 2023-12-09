import WarehouseItem from "../entities/warehouse_item";

export interface IWareHouseItemValidation {
    validate(wareHouseItem: WarehouseItem): void;
}