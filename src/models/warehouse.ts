import { IItemRepository} from "../interfaces/item_repository_interface";
import { ItemArrayRepository } from "../repositories/array_repository";
import { Item } from "./item";

export class WareHouse {
    private _id: number;
    private _inventoryItens: IItemRepository;
    //historicoSaida;
    //Solicitacoes;

    constructor(id: number, inventory: IItemRepository) {
        this._id = id;
        this._inventoryItens = inventory;
    }

    get id(): number {
        return this._id;
    }

    insertItem(item: Item): void {
        this._inventoryItens.insertItem(item);
    }

    consultItem(id: number): Item {
        return this._inventoryItens.consultItem(id);
    }

    consultItemIndex(id: number): number {
        return this._inventoryItens.consultItemIndex(id);
    }

    removeItem(id: number): void {
        this._inventoryItens.removeItem(id);
    }

    updateItem(id: number, newItem: Item) {
        this._inventoryItens.updateItem(id, newItem);
    }

}

let w1: WareHouse = new WareHouse(1, new ItemArrayRepository());