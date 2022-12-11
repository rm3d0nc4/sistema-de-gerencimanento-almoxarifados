import Item from "../models/item";

export interface IItemRepository {
    insertItem(item: Item): void;
    findItemById(id: number): Promise<Item>;
    updateItem(id: number, newItem: Item): void
    deleteItem(id: number): void;
}