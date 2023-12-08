import { DeleteWareHouseItemUseCase } from "../usecases/delete_ware_house_item_usecase";

export class DeleteWareItemController{
  private deleteWareItemUsecase: DeleteWareHouseItemUseCase;


  constructor(deleteWareItemUseCase: DeleteWareHouseItemUseCase){
    this.deleteWareItemUsecase = deleteWareItemUseCase
  }

  async handle(id: number){
    await this.deleteWareItemUsecase.execute(id)
    
  }
}