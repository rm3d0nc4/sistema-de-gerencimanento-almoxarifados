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

}

let w1: WareHouse = new WareHouse(1, new ItemArrayRepository());