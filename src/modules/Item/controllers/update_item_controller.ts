import Item from "../entities/item";
import { UpdateItemUseCase } from "../usecases/update_item_usecase";

export class UpdateItemController{
  private updateItemUsecase: UpdateItemUseCase;


  constructor(updateItemUseCase: UpdateItemUseCase){
    this.updateItemUsecase = updateItemUseCase
  }

  async handle(id: number, newItem: Item){
    await this.updateItemUsecase.execute(id, newItem) 
  }
}