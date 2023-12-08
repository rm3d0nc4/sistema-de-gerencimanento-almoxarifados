import { WareHouse } from "../entities/warehouse";
import { InsertWareHouseUseCase } from "../usecases/insert_ware_house_usecase";

export class InsertWareHouseController{
  private _insertWareHouseUseCase: InsertWareHouseUseCase;


  constructor(insertWareHouseUseCase: InsertWareHouseUseCase){
    this._insertWareHouseUseCase = insertWareHouseUseCase
  }

  async handle(newWareHouse: WareHouse){
    await this._insertWareHouseUseCase.execute(newWareHouse) 
  }
}