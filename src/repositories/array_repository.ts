import { syncIndexes } from "mongoose";
import { getHeapStatistics } from "v8";
import { ExpirationDateErrors, InventoryError } from "../errors/errors";
import { IItemRepository } from "../interfaces/item_repository_interface";
import { Item } from "../models/item";
import { Perishable } from "../models/perishable";

export class ItemArrayRepository implements IItemRepository {
    private _itens: Array<Item> = [];

    insertItem(item: Item): void {
        let date: Date = new Date();
        if (item instanceof Perishable) {
            if ((<Perishable>item).expirationDate.getTime() > date.getTime()) {
                throw new ExpirationDateErrors("Expiration date exceed");
            } 
        }

        this._itens.push(item);
    }

    consultItem(id: number): Item {
        for (let item of this._itens) {
            if (item.id == id) {
                return item;
            }
        }

        throw new InventoryError("Item not found");
    }

    consultItemIndex(id: number): number {
        for (let i = 0; i < this._itens.length; i++) {
            if (this._itens[i].id == id) {
                return i;
            }
        }

        throw new InventoryError("Item not found");
    }

    removeItem(id: number): void {
        let index: number = this.consultItemIndex(id);
        /* let aux: Item = this._itens[index];
        this._itens[index] = this._itens[this._itens.length - 1];
        this._itens[this._itens.length - 1] = aux; */
        
        this._itens.splice(index, 1);
    }

    updateItem(id: number, newItem: Item): void {
        let date: Date = new Date();
        if (newItem instanceof Perishable) {
            if ((<Perishable>newItem).expirationDate.getTime() > date.getTime()) {
                throw new ExpirationDateErrors("Expiration date exceed");
            } 
        }

        this._itens[this.consultItemIndex(id)] = newItem;
    }
    
}