import { WareHouse } from "../models/warehouse";

export default interface IWareHouseRepository {
    findAllWarehouses(): Promise<Array<WareHouse>>;
    insertWarehouse(wareHouse: WareHouse): Promise<void>;
    findWarehouseById(id: number): Promise<WareHouse>;
    deleteWarehouse(id: number): Promise<void>;
    updateWarehouse(id: number, newWareHouse: WareHouse): Promise<void>
}
