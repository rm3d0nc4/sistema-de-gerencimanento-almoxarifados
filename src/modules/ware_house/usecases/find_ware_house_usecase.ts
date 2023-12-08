import { WareHouse } from "../entities/warehouse";
import { WareHouseFindableRepository } from "../repositories/ware_house_repository";

export class FindWareHouseUseCase{
    constructor(private repository: WareHouseFindableRepository) {}

    async execute(id: number): Promise<WareHouse> {
        const items = await this.repository.find( id)
        return items;
    }
}

