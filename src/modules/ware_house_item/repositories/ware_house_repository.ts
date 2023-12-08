import { WareHouse } from "../entities/warehouse";

export interface WareHouseInsertableRepository {
    insert(item: WareHouse): Promise<void>;
}

export interface WareHouseFindableRepository {
    find(id: string): Promise<WareHouse>;
}
export interface WareHouseFindableAllRepository {
    findAll(): Promise<WareHouse[]>;
}

export interface WareHouseUpdatableRepository {
    update(id: number, newWareHouse: WareHouse): Promise<void>;
}

export interface WareHouseDeletableRepository {
    delete(id: number): Promise<void>;
}

