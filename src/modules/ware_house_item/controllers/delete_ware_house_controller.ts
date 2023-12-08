import { DeleteWareHouseUseCase } from "../usecases/delete_ware_house_usecase";

export class DeleteWareController{
  private deleteWareUsecase: DeleteWareHouseUseCase;


  constructor(deleteWareUseCase: DeleteWareHouseUseCase){
    this.deleteWareUsecase = deleteWareUseCase
  }

  async handle(id: number){
    await this.deleteWareUsecase.execute(id)
    
  }
}