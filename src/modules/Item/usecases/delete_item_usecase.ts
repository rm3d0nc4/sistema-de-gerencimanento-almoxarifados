import { ItemDeletableRepository } from "../repositories/item_repository";

export class DeleteItemUseCase{
    constructor(private repository: ItemDeletableRepository) {}

    async execute(id: number): Promise<void> {
       await this.repository.delete(id)
        
    }
}

