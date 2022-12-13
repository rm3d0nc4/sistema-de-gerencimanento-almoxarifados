import { Database } from 'sqlite';
import IWareHouseRepository from '../interfaces/warehouse_repository_interface';
import { WareHouse } from './../models/warehouse';
import  WarehouseNotFoundError  from '../errors/ware_item_not_found_error'

export default class WarehouseRepository implements IWareHouseRepository {
    _database: Database;

    constructor(database: Database) {
        this._database = database;
    }

    async findAllWarehouses(): Promise<Array<WareHouse>> {
        let data: Object | undefined = await this._database.all(`SELECT * FROM WAREHOUSE`);
        if(data == undefined) {
            throw new WarehouseNotFoundError('Não existem Almoxaridados Cadastrados'); // Lançar Exceção
        } else {
            let values = <Array<Object>> data;

            let itemsList: Array<WareHouse> = values.map((value, index) => {
                return WareHouse.fromObject(value);
            }) 
            return itemsList;
            }
    }
    
    async insertWarehouse(wareHouse: WareHouse): Promise<void> {
        await this._database.exec(`INSERT INTO WAREHOUSE (NAME) VALUES ('${wareHouse.name}')`);

    }

    async findWarehouseById(id: number): Promise<WareHouse> {
        let data: Object | undefined = await this._database.get(`SELECT * FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`)
        if(data == undefined) {
            throw new WarehouseNotFoundError('Almoxarifado não encontrado'); // Lançar Exceção
        } else {
            let item: WareHouse = WareHouse.fromObject(data);
            return item; 
        }
    }

    async deleteWarehouse(id: number): Promise<void> {
        await this.findWarehouseById(id);
        await this._database.exec(`DELETE FROM WAREHOUSE WHERE WAREHOUSE_ID = ${id}`);
    }

    async updateWarehouse(id: number, wareHouse: WareHouse): Promise<void> {
        await this._database.exec(`
            UPDATE WAREHOUSE SET NAME = '${wareHouse.name}' WHERE WAREHOUSE_ID = ${id}
        `);
    }
}