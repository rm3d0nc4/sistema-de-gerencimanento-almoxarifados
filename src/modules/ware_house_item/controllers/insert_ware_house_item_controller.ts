import WarehouseItem from "../entities/warehouse_item";
import { InsertWareHouseItemUseCase } from "../usecases/insert_ware_house_item_usecase";

export class InsertItemController{
  private _insertWareHouseItemUseCase: InsertWareHouseItemUseCase;


  constructor(updateWareHouseItemUseCase: InsertWareHouseItemUseCase){
    this._insertWareHouseItemUseCase = updateWareHouseItemUseCase
  }

  async handle(newItem: WarehouseItem){
    await this._insertWareHouseItemUseCase.execute(newItem) 
  }
}