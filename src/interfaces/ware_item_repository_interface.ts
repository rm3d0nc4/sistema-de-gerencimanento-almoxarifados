import WarehouseItem from "../models/warehouse_item";

export default interface IWareItemRepository {
    findAllWareItems(): Promise<Array<WarehouseItem>>;
    findWareItemById(id: number): Promise<WarehouseItem>;
    insertWareItem(wareHouseItem: WarehouseItem): Promise<void>;
    updateWareItem(id: number, wareHouseItem: WarehouseItem): Promise<void>;
    deleteWareItem(id: number): Promise<void>;
}