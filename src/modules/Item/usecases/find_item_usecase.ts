import Item from "../entities/item";
import { ItemFindableRepository } from "../repositories/item_repository";

export class FindItemsUseCase{
    constructor(private repository: ItemFindableRepository) {}

    async execute(): Promise<Item[]> {
        const items = await this.repository.find()
        return items;
    }
}

