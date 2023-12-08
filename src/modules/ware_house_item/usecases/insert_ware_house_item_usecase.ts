import WarehouseItem from "../entities/warehouse_item";
import { WareHouseItemInsertableRepository } from "../repositories/ware_house_item_repository";

export class InsertWareHouseItemUseCase{
    constructor(private repository: WareHouseItemInsertableRepository) {}

    async execute(newItem: WarehouseItem): Promise<void> {
       await this.repository.insert(newItem)
        
    }
}

