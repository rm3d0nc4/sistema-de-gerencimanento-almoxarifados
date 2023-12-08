import WarehouseItem from "../entities/warehouse_item";
import { WareHouseItemUpdatableRepository } from "../repositories/ware_house_item_repository";

export class UpdateWareHouseItemUseCase{
    constructor(private repository: WareHouseItemUpdatableRepository) {}

    async execute(id: number, newItem: WarehouseItem): Promise<void> {
       await this.repository.update(id, newItem)
        
    }
}

