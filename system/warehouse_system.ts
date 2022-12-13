import { WareHouse } from '../src/models/warehouse';
import Item from "../src/models/item";
import WarehouseItem from "../src/models/warehouse_item";
import DatabaseRepository from "../src/repositories/database_repository";
import ItemRepository from "../src/repositories/item_repository";
import WarehouseRepository from "../src/repositories/warehouse_repository";
import WareItemRepository from "../src/repositories/ware_item_repository";
import { Perishable } from '../src/models/perishable';
import utils from '../src/utils/utils';


class WarehouseSystem {

    protected databaseRepository: DatabaseRepository;
    protected itemRepository: ItemRepository;
    protected warehouseRepository: WarehouseRepository;
    protected wareItemRepository: WareItemRepository;

    static async initialize(path: string) : Promise<WarehouseSystem> {
        try {
            let warehouseSystem = new WarehouseSystem();
    
            warehouseSystem.databaseRepository = await DatabaseRepository.initialize(path);
            warehouseSystem.itemRepository = new ItemRepository(warehouseSystem.databaseRepository.db);
            warehouseSystem.warehouseRepository = new WarehouseRepository(warehouseSystem.databaseRepository.db);
            warehouseSystem.wareItemRepository = new WareItemRepository(warehouseSystem.databaseRepository.db);
    
            return warehouseSystem;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async addItem(): Promise<void> {
        try {
            let description: string = utils.inputText('Descrição do item: ');
            let item = new Item(0, description);
            await this.itemRepository.insertItem(item);
        } catch (error) {
            
        }
    }

    async findAllItems(): Promise<Item[]> {
        try {
            let items: Item[] = await this.itemRepository.findAllItems();
            return items;
        } catch (error) {
            
        }
    }

    async findItem(): Promise<Item> {
        try {
            let id: number = utils.inputNumber('Id do item: ');
            let item: Item = await this.itemRepository.findItemById(id);
            return item;
        } catch (error) {
            
        }
    }

    async editItem(): Promise<void> {
        try {
            let item = await this.findItem();
            let newdescription = utils.inputText('Nova descrição: ', true);
            item.description = newdescription ?? item.description;
            await this.itemRepository.updateItem(item.id, item);
        } catch (error) {
            
        }
    }

    async removeItem(): Promise<void> {
        try {
            let id: number = utils.inputNumber('Id do item: ');
            await this.itemRepository.deleteItem(id);            
        } catch (error) {
            
        }
    }

    async addWarehouse(): Promise<void> {
        try {
            let name: string = utils.inputText('Nome do item: ');
            let warehouse: WareHouse = new WareHouse(0, name);
            await this.warehouseRepository.insertWarehouse(warehouse);
        } catch (error) {
            
        }
    }

    async findAllWareHouses(): Promise<WareHouse[]> {
        try {
            let warehouses: WareHouse[] = await this.warehouseRepository.findAllWarehouses();
            return warehouses;
        } catch (error) {
            
        }
    }

    async findWarehouse(): Promise<WareHouse> {
        try {
            let id: number = utils.inputNumber('Id do almoxarifado: ');
            let warehouse: WareHouse = await this.warehouseRepository.findWarehouseById(id);
            return warehouse;            
        } catch (error) {
            
        }
    }

    async editWarehouse(): Promise<void> {
        try {
            let wareHouse: WareHouse = await this.findWarehouse();
            let newName: string = utils.inputText('Novo nome: ', true);
            wareHouse.name = newName ?? wareHouse.name;
            await this.warehouseRepository.updateWarehouse(wareHouse.id, wareHouse);
        } catch (error) {
            
        }
    }

    async removeWarehouse(): Promise<void> {
        try {
            let id: number = utils.inputNumber('Id do almoxarifado: ');
            await this.warehouseRepository.deleteWarehouse(id);
            
        } catch (error) {
            
        }
    }

    async addwareItem(): Promise<void> {
        try {
            let type: string = utils.inputWareItemType('Tipo de item (N - Normal, P - Perecível)');
            let item: Item = await this.findItem();
            let warehouse: WareHouse = await this.findWarehouse();
            let insertionDate: Date = new Date();
            let amount: number = utils.inputNumber('Quantidade de itens:');
            let location: string = utils.inputLocation('Localizacao: ');
    
            let wareItem: WarehouseItem;
    
    
            if(type == 'perishable') {
                let expirationDate: Date = utils.inputDate('Data de vencimeto: ');
    
                wareItem = new Perishable({
                    id: 0, 
                    item: item, 
                    warehouse: warehouse, 
                    insertionDate: insertionDate, 
                    amount: amount, 
                    location: location, 
                    expirationDate: expirationDate,
                })
            } else {
                let wareItem: WarehouseItem = new WarehouseItem({
                    id: 0, 
                    item: item, 
                    warehouse: warehouse, 
                    insertionDate: insertionDate, 
                    amount: amount, 
                    location: location,
                });
            }
    
            await this.wareItemRepository.insertWareItem(wareItem);
        } catch (error) {
            
        }
    }

    async findAllWareItem(): Promise<WarehouseItem[]> {
        try {
            let wareItens: WarehouseItem[] = await this.wareItemRepository.findAllWareItems();
            return wareItens;            
        } catch (error) {
            
        }
    }

    async findWareItem(): Promise<WarehouseItem> {
        try {
            let property: string = utils.inputProperty();
            let value: string = utils.inputAlphaNumeric('Valor desejado: ')
    
            let wareItem: WarehouseItem = await this.wareItemRepository.findWareItemByProperty(property, value);
            return wareItem;
        } catch (error) {
            
        }
    }

    async editWareItem(): Promise<void> {
        try {
            let wareItem: WarehouseItem = await this.findWareItem();
            wareItem.item = await this.findItem();
            wareItem.warehouse = await this.findWarehouse();
            wareItem.amount = utils.inputNumber('Nova quantidade: ', true) ?? wareItem.amount;
            wareItem.location = utils.inputLocation('Nova localização', true) ?? wareItem.location;
    
            await this.wareItemRepository.updateWareItem(wareItem.id, wareItem);
        } catch (error) {
            
        }
    }

    async deleteWareItem(): Promise<void> {
        try {
            let wareItem: WarehouseItem = await this.findWareItem();            
            await this.wareItemRepository.deleteWareItem(wareItem.id);
        } catch (error) {
            
        }
    }






}