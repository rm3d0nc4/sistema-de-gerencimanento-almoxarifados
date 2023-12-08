import {  FindWareHouseUseCase } from "../usecases/find_ware_house_usecase";

export class FindWareHouseController{
  private findWareHouseUsecase: FindWareHouseUseCase;


  constructor(findWareHouseUseCase: FindWareHouseUseCase){
    this.findWareHouseUsecase = findWareHouseUseCase
  }

  async handle(id: number){
    const item = await this.findWareHouseUsecase.execute(id)
    return item
  }
}