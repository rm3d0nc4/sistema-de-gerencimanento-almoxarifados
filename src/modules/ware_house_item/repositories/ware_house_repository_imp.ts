
import { WareHouse } from "../entities/warehouse";
import { WareHouseDeletableRepository, WareHouseFindableRepository , WareHouseFindableAllRepository, WareHouseInsertableRepository, WareHouseUpdatableRepository} from "./ware_house_repository";

export class WareHouseRepositoryImp implements WareHouseDeletableRepository, WareHouseFindableRepository, WareHouseUpdatableRepository, WareHouseInsertableRepository, WareHouseFindableAllRepository {
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<WareHouse> {
        throw new Error("Method not implemented.");
    }
    update(id: number, newItem: WareHouse): Promise<void> {
        throw new Error("Method not implemented.");
    }
    insert(item: WareHouse): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<WareHouse[]> {
        throw new Error("Method not implemented.");
    }


}