import Item from "../entities/item";

export interface ItemInsertableRepository {
    insert(item: Item): Promise<void>;
}

export interface ItemFindableRepository {
    find(id: number): Promise<Item>;
}
export interface ItemFindableAllRepository {
    findAll(): Promise<Item[]>;
}

export interface ItemUpdatableRepository {
    update(id: number, newItem: Item): Promise<void>;
}

export interface ItemDeletableRepository {
    delete(id: number): Promise<void>;
}

