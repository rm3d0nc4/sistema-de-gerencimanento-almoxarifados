import WarehouseItem from "../entities/warehouse_item";

export interface WareHouseItemInsertableRepository {
    insert(item: WarehouseItem): Promise<void>;
}

export interface WareHouseItemFindableRepository {
    findAllByProperties(property: string, value: any): Promise<WarehouseItem[]>;
}
export interface WareHouseItemFindableAllRepository {
    findAll(): Promise<WarehouseItem[]>;
}

export interface WareHouseItemUpdatableRepository {
    update(id: number, newItem: WarehouseItem): Promise<void>;
}

export interface WareHouseItemDeletableRepository {
    delete(id: number): Promise<void>;
}

