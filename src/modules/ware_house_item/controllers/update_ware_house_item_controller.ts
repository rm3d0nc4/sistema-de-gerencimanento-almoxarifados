import WarehouseItem from "../entities/warehouse_item";
import { UpdateWareHouseItemUseCase } from "../usecases/update_ware_house_item_usecase";

export class UpdateWItemController{
  private updateWareHouseItemUsecase: UpdateWareHouseItemUseCase;


  constructor(updateWareHouseItemUseCase: UpdateWareHouseItemUseCase){
    this.updateWareHouseItemUsecase = updateWareHouseItemUseCase
  }

  async handle(id: number, newItem: WarehouseItem){
    await this.updateWareHouseItemUsecase.execute(id, newItem) 
  }
}