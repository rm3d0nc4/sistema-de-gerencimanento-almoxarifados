import { WareHouse } from "../entities/warehouse";
import { UpdateWareHouseUseCase } from "../usecases/update_ware_house_usecase";

export class UpdateWController{
  private updateWareHouseUsecase: UpdateWareHouseUseCase;


  constructor(updateWareHouseUseCase: UpdateWareHouseUseCase){
    this.updateWareHouseUsecase = updateWareHouseUseCase
  }

  async handle(id: number, newWareHouse: WareHouse){
    await this.updateWareHouseUsecase.execute(id, newWareHouse) 
  }
}