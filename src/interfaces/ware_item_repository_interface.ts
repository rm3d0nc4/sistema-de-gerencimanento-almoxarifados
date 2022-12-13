import WarehouseItem from "../models/warehouse_item";

export default interface IWareItemRepository {
    findAllWareItems(): Promise<Array<WarehouseItem>>;
    findWareItemByProperty(property: string, value: any): Promise<WarehouseItem>;
    insertWareItem(wareHouseItem: WarehouseItem): Promise<void>;
    updateWareItem(id: number, wareHouseItem: WarehouseItem): Promise<void>;
    deleteWareItem(id: number): Promise<void>;
}