import Item from "../entities/item";
import { InsertItemUseCase } from "../usecases/inser_item_usecase";

export class InsertItemController{
  private _insertItemUseCase: InsertItemUseCase;


  constructor(updateItemUseCase: InsertItemUseCase){
    this._insertItemUseCase = updateItemUseCase
  }

  async handle(newItem: Item){
    await this._insertItemUseCase.execute(newItem) 
  }
}