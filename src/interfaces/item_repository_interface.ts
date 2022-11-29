import { Item } from "../models/item";

export interface IItemRepository {

    insertItem(item: Item): void;
    consultItem(id: number): Item;
    consultItemIndex(id: number): number;
    removeItem(id: number): void;
    updateItem(id: number, newItem: Item): void
}