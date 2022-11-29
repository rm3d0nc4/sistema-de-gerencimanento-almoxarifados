import { IItemRepository } from "../interfaces/item_repository_interface";
import { Item } from "../models/item";

export class ItemArrayRepository implements IItemRepository {
    private _itens: Array<Item> = [];

    insertItem(item: Item): void {
        throw new Error("Method not implemented.");
    }
    consultItem(id: number): Item {
        throw new Error("Method not implemented.");
    }
    removeItem(id: number): void {
        throw new Error("Method not implemented.");
    }
    updateItem(id: number, newItem: Item): void {
        throw new Error("Method not implemented.");
    }

}