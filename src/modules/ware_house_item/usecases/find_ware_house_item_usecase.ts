import WarehouseItem from "../entities/warehouse_item";
import { WareHouseItemFindableRepository } from "../repositories/ware_house_item_repository";

export class FindWareHouseItemsUseCase{
    constructor(private repository: WareHouseItemFindableRepository) {}

    async execute(property: string, value: any): Promise<WarehouseItem[]> {
        const items = await this.repository.findAllByProperties(property, value)
        return items;
    }
}

