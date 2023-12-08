import { WareHouse } from '../src/models/warehouse';
import Item from "../src/models/item";
import WarehouseItem from "../src/models/warehouse_item";
import DatabaseRepository from "../src/repositories/database_repository";
import ItemRepository from "../src/repositories/item_repository";
import WarehouseRepository from "../src/repositories/warehouse_repository";
import WareItemRepository from "../src/repositories/ware_item_repository";
import { Perishable } from '../src/models/perishable';
import utils from '../src/utils/werehouseUtils';
import textUtils from '../src/utils/textUtils';
import inputUtils from '../src/utils/inputUtils';
import numberUtils from '../src/utils/numberUtils';


export default class WarehouseSystem {

    protected databaseRepository: DatabaseRepository;
    protected itemRepository: ItemRepository;
    public warehouseRepository: WarehouseRepository;
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
            let description: string = inputUtils.inputText('Descrição do item: ');
            let item = new Item(0, description);
            await this.itemRepository.insertItem(item);
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async findAllItems(): Promise<Item[]> {
        try {
            let items: Item[] = await this.itemRepository.findAllItems();

            console.log (
            "=================================================" + "\n" +
            "=============== Itens Cadastrados ===============" + "\n" +
            "=================================================" + "\n"
            )

            items.forEach((item) => console.log('> ' + item.toString()))
            return items;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async findItem(): Promise<Item> {
        try {
            let id: number = inputUtils.inputNumber('Id do item: ');
            let item: Item = await this.itemRepository.findItemById(id);
            console.log('> ' + item.toString());
            return item;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async editItem(): Promise<void> {
        try {
            let item = await this.findItem();
            let newdescription = inputUtils.inputText('Nova descrição: ', true);
            item.description = newdescription ?? item.description;
            await this.itemRepository.updateItem(item.id, item);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async removeItem(): Promise<void> {
        try {
            let id: number = inputUtils.inputNumber('Id do item: ');
            await this.itemRepository.deleteItem(id);
            console.log('Operação Sucedida!');            
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async addWarehouse(): Promise<void> {
        try {
            let name: string = inputUtils.inputText('Nome do item: ');
            let warehouse: WareHouse = new WareHouse(0, name);
            await this.warehouseRepository.insertWarehouse(warehouse);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async findAllWarehouses(): Promise<WareHouse[]> {
        try {
            let warehouses: WareHouse[] = await this.warehouseRepository.findAllWarehouses();
            console.log (
            "===============================================" + "\n" +
            "========== Almoxarifados Cadastrados ==========" + "\n" +
            "===============================================" + "\n"
            )
            warehouses.forEach((warehouse) => console.log('> ' + warehouse.toString()));
            return warehouses;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }
    
    async findWarehouse(): Promise<WareHouse> {
        try {
            let id: number = inputUtils.inputNumber('Id do almoxarifado: ');
            let warehouse: WareHouse = await this.warehouseRepository.findWarehouseById(id);
            console.log('> ' + warehouse.toString())
            return warehouse;            
        } catch (error) {
            console.log((<Error>error).message);
        }
    }
    
    async editWarehouse(): Promise<void> {
        try {
            let wareHouse: WareHouse = await this.findWarehouse();
            let newName: string = inputUtils.inputText('Novo nome: ', true);
            wareHouse.name = newName ?? wareHouse.name;
            await this.warehouseRepository.updateWarehouse(wareHouse.id, wareHouse);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
    }
    
    async removeWarehouse(): Promise<void> {
        try {
            let id: number = inputUtils.inputNumber('Id do almoxarifado: ');
            await this.warehouseRepository.deleteWarehouse(id);
            console.log('Operação Sucedida!');
            
        } catch (error) {
            console.log((<Error>error).message);
        }
    }
    
    async addwareItem(): Promise<void> {
        try {
            let type: string = inputUtils.inputWareItemType('Tipo de item (N - Normal, P - Perecível): ');
            let itemId: number = inputUtils.inputNumber('Id do Item: ');
            let item: Item = await this.itemRepository.findItemById(itemId);
            let warehouseId: number = inputUtils.inputNumber('Id do Almoxarifado: ');
            let warehouse = await this.warehouseRepository.findWarehouseById(warehouseId);
            let insertionDate: Date = new Date();
            let amount: number = inputUtils.inputNumber('Quantidade de itens:');
            let location: string = inputUtils.inputLocation('Localizacao (C_P_A_): ');
    
            let wareItem: WarehouseItem;
            
            
            if(type == 'P') {
                let expirationDate: Date = inputUtils.inputDate('Data de vencimeto (AAAA-MM-DD): ');
    
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
                wareItem = new WarehouseItem({
                    id: 0, 
                    item: item, 
                    warehouse: warehouse, 
                    insertionDate: insertionDate, 
                    amount: amount, 
                    location: location,
                });
            }
            await this.wareItemRepository.insertWareItem(wareItem);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
    }
    
    async findAllWareItem(): Promise<WarehouseItem[]> {
        try {
            let wareItems: WarehouseItem[] = await this.wareItemRepository.findAllWareItems();

            console.log (
"=================================================" + "\n" +
"=============== Lotes Cadastrados ===============" + "\n" +
"=================================================" + "\n"
 
            );
            wareItems.forEach((wareItem) => console.log('> ' + wareItem.toString()));
            return wareItems;            
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async findAllWareItemByProperty(): Promise<WarehouseItem[]> {
        try {
            let property: string = inputUtils.inputProperty();
            let value: string = inputUtils.inputAlphaNumeric('Valor desejado: ');
            let wareItemsByProperty: WarehouseItem[] = await this.wareItemRepository.findAllWareItemsByProperty(property, value);
            console.log (
                "=================================================" + "\n" +
                "======== Lotes Que Atendem a Propriedade ========" + "\n" +
                "=================================================" + "\n"
                
                            );
            wareItemsByProperty.forEach((wareItem) => console.log('> ' + wareItem.toString()));
            return wareItemsByProperty;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async findWareItem(): Promise<WarehouseItem> {
        try {
            let property: string = 'WARE_ITEM_ID';
            let value: string = inputUtils.inputNumber('Id do item: ').toString();
    
            let wareItem: WarehouseItem = await this.wareItemRepository.findWareItemByProperty(property, value);
            console.log('> ' + wareItem.toString());
            return wareItem;
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async editWareItem(): Promise<void> {
        try {
            let value: string = inputUtils.inputNumber('Id do item: ').toString();
            let wareItem: WarehouseItem = await this.wareItemRepository.findWareItemByProperty('WARE_ITEM_ID', value);
            let itemId: number = inputUtils.inputNumber('Id do Item: ');
            wareItem.item = await this.itemRepository.findItemById(itemId);
            let warehouseId: number = inputUtils.inputNumber('Id do Almoxarifado: ');
            wareItem.warehouse = await this.warehouseRepository.findWarehouseById(warehouseId);
            wareItem.amount = inputUtils.inputNumber('Nova quantidade: ', true) ?? wareItem.amount;
            wareItem.location = inputUtils.inputLocation('Nova localização (C_P_A_): ', true) ?? wareItem.location;
    
            await this.wareItemRepository.updateWareItem(wareItem.id, wareItem);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
    }

    async deleteWareItem(): Promise<void> {
        try {
            let id: number = inputUtils.inputNumber('Id do Lote: ')             
            await this.wareItemRepository.deleteWareItem(id);
            console.log('Operação Sucedida!');
        } catch (error) {
            console.log((<Error>error).message);
        }
        
    }

}