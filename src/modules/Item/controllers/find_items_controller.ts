import { FindItemsUseCase } from "../usecases/find_item_usecase";

export class FindItemController{
  private findItemUsecase: FindItemsUseCase;


  constructor(findItemUseCase: FindItemsUseCase){
    this.findItemUsecase = findItemUseCase
  }

  async handle(id: number){
    const item = await this.findItemUsecase.execute()
    return item
  }
}