import Item from "../entities/item";
import {  ItemInsertableRepository } from "../repositories/item_repository";

export class InsertItemUseCase{
    constructor(private repository: ItemInsertableRepository) {}

    async execute(newItem: Item): Promise<void> {
       await this.repository.insert(newItem)
        
    }
}

