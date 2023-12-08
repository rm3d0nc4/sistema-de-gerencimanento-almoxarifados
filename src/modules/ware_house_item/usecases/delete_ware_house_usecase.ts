import { WareHouseDeletableRepository } from "../repositories/ware_house_repository";

export class DeleteWareHouseUseCase{
    constructor(private repository: WareHouseDeletableRepository) {}

    async execute(id: number): Promise<void> {
       await this.repository.delete(id)
        
    }
}

