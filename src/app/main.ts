import { WareHouse } from './../models/warehouse';
import DatabaseRepository from "../repositories/database_repository"
import ItemRepository from "../repositories/item_repository";
import WareItemRepository from "../repositories/ware_item_repository";
import WarehouseRepository from '../repositories/warehouse_repository';
import WarehouseItem from "../models/warehouse_item";
import Item from "../models/item";


console.log('Aqui!');

(async () => {
    const repository = await DatabaseRepository.initialize('./../../database/data.db');
    let itemRepository: ItemRepository = new ItemRepository(repository.db); // ok
    let warehouseRepository: WarehouseRepository = new WarehouseRepository(repository.db); // ok
    let wareItemRepository: WareItemRepository = new WareItemRepository(repository.db);


    let w1: WareHouse = await warehouseRepository.findWarehouseById(3);
    let w2: WareHouse = await warehouseRepository.findWarehouseById(4);
    let w3: WareHouse = await warehouseRepository.findWarehouseById(5);

    let i1: Item = await itemRepository.findItemById(3);
    console.log(i1);
    let i2: Item = await itemRepository.findItemById(4);
    console.log(i2);
    let i3: Item = await itemRepository.findItemById(5);
    console.log(i3);

    let wi1: WarehouseItem = new WarehouseItem({
        id: 0, 
        item: i1, 
        warehouse: w1, 
        insertionDate: new Date(), 
        amount: 5, 
        location: 'C4P1H1'});
    // console.log(wi1.toList());
    
    let wi2: WarehouseItem = new WarehouseItem({
        id: 0, 
        item: i1, 
        warehouse: w2, 
        insertionDate: new Date(), 
        amount: 9, 
        location: 'C2P4H5'});
    // console.log(wi2.toList());
        
        let wi3: WarehouseItem = new WarehouseItem({
            id: 0, 
            item: i3, 
            warehouse: w3, 
            insertionDate: new Date(), 
            amount: 7, 
            location: 'C1P1H1'});
        // console.log(wi3.toList());


    // await wareItemRepository.insertWareItem(wi1);

    // await wareItemRepository.insertWareItem(wi2);

    // await wareItemRepository.insertWareItem(wi3);

    await wareItemRepository.updateWareItem(16, wi2);
    const result = await wareItemRepository.findWareItemById(16);
    console.log(result);
})()
