import {  FindWareHouseItemsUseCase } from "../usecases/find_ware_house_item_usecase";

export class FindWareHouseItemsController{
  private findWareHouseItemUsecase: FindWareHouseItemsUseCase;


  constructor(findWareHouseItemUseCase: FindWareHouseItemsUseCase){
    this.findWareHouseItemUsecase = findWareHouseItemUseCase
  }

  async handle(property: string, value: any){
    const item = await this.findWareHouseItemUsecase.execute(property, value)
    return item
  }
}