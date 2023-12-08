
import WarehouseItemNotFoundError from "../../../errors/ware_item_not_found_error";
import DatabaseServiceSingleton from "../../../service/database_service";
import { WareHouse } from "../entities/warehouse";
import { WareHouseDeletableRepository, WareHouseFindableRepository , WareHouseFindableAllRepository, WareHouseInsertableRepository, WareHouseUpdatableRepository} from "./ware_house_repository";

export class WareHouseRepositoryImp implements WareHouseDeletableRepository, WareHouseFindableRepository, WareHouseUpdatableRepository, WareHouseInsertableRepository, WareHouseFindableAllRepository {
    private _database: DatabaseServiceSingleton


    constructor(database: DatabaseServiceSingleton){
        this._database= database
    }
   
    async findAll(): Promise<Array<WareHouse>> {
        let data: Object | undefined = await this._database.db.all(`SELECT * FROM WAREHOUSE`);
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Não existem Almoxaridados Cadastrados'); // Lançar Exceção
        } 
            let values = <Array<Object>> data;

            let itemsList: Array<WareHouse> = values.map((value, index) => {
                return WareHouse.fromObject(value);
            }) 
            return itemsList;
            
    }
    
    async insert(item: WareHouse): Promise<void> {
        await this._database.db.exec(`INSERT INTO WAREHOUSE (NAME) VALUES ('${item.name}')`);

    }

    async find(id: number): Promise<WareHouse> {
        let data: Object | undefined = await this._database.db.get(`SELECT * FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`)
        if(data == undefined) {
            throw new WarehouseItemNotFoundError('Almoxarifado não encontrado'); // Lançar Exceção
        } 
         let item: WareHouse = WareHouse.fromObject(data);
        return item; 
        
    }

    async delete(id: number): Promise<void> {
        await this.find(id);
        await this._database.db.exec(`DELETE FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`);
    }

    async update(id: number, newItem: WareHouse): Promise<void> {
        await this._database.db.exec(`
            UPDATE WAREHOUSE SET NAME = '${newItem.name}' WHERE WAREHOUSE_ID = ${id}
        `);
    }


}