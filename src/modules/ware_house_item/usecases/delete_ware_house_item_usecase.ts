import { WareHouseItemDeletableRepository } from "../repositories/ware_house_item_repository";

export class DeleteWareHouseItemUseCase{
    constructor(private repository: WareHouseItemDeletableRepository) {}

    async execute(id: number): Promise<void> {
       await this.repository.delete(id)
        
    }
}

