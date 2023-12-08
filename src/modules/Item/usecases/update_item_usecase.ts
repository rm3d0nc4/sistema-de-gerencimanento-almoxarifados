import Item from "../entities/item";
import {  ItemUpdatableRepository } from "../repositories/item_repository";

export class UpdateItemUseCase{
    constructor(private repository: ItemUpdatableRepository) {}

    async execute(id: number, newItem: Item): Promise<void> {
       await this.repository.update(id, newItem)
        
    }
}

