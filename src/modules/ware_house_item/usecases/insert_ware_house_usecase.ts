import { WareHouse } from "../entities/warehouse";
import { WareHouseInsertableRepository } from "../repositories/ware_house_repository";

export class InsertWareHouseUseCase{
    constructor(private repository: WareHouseInsertableRepository) {}

    async execute(newItem: WareHouse): Promise<void> {
       await this.repository.insert(newItem)
        
    }
}

