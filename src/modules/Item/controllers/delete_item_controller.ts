import { DeleteItemUseCase } from "../usecases/delete_item_usecase";

export class DeleteItemController{
  private deleteItemUsecase: DeleteItemUseCase;


  constructor(findItemUseCase: DeleteItemUseCase){
    this.deleteItemUsecase = findItemUseCase
  }

  async handle(id: number){
    await this.deleteItemUsecase.execute(id)
    
  }
}