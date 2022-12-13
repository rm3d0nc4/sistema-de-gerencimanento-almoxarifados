import { WareHouse } from './../models/warehouse';
import DatabaseRepository from "../repositories/database_repository"
import ItemRepository from "../repositories/item_repository";
import WareItemRepository from "../repositories/ware_item_repository";
import WarehouseRepository from '../repositories/warehouse_repository';
import WarehouseItem from "../models/warehouse_item";
import Item from "../models/item";


console.log('Aqui!');

(async () => {
    console.log('Ali0!');
        const path = 'C:/Users/PC-01/OneDrive/ADS/Mod_II/poo/codigos/projeto_sistema_almoxarifado/database/data.db';
        const repository = await DatabaseRepository.initialize(path);
        await repository.db.get('DELETE FROM ITEM WHERE ITEM_ID = 24')
})()
console.log('Asli!');
