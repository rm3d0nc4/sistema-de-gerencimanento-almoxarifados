import { WareHouse } from "../entities/warehouse";
import { WareHouseUpdatableRepository } from "../repositories/ware_house_repository";

export class UpdateWareHouseUseCase{
    constructor(private repository: WareHouseUpdatableRepository) {}

    async execute(id: number, newItem: WareHouse): Promise<void> {
       await this.repository.update(id, newItem)
        
    }
}

