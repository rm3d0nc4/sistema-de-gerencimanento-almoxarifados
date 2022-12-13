import WarehouseSystem from "../../system/warehouse_system"
import menu from "../menu/menu";
import utils from "../utils/utils";

(async () => {
    const path = 'C:/Users/PC-01/OneDrive/ADS/Mod_II/poo/codigos/projeto_sistema_almoxarifado/database/data.db';
    
    const system: WarehouseSystem = await WarehouseSystem.initialize(path);

    
    let wareHouseOptions: Map<string, any> = new Map<string, any>([
        ['M', menu.wareHouse],
        ['1', () => system.findAllWarehouses()],
        ['2', () => system.addWarehouse()],
        ['3', () => system.findWarehouse()],
        ['4', () => system.removeWarehouse()],
        ['5', () => system.editWarehouse()],
        ['6', menu.principal],
    ]);
    
    let itemOptions: Map<string, any> = new Map<string, any>([
        ['M', menu.item],
        ['1', () => system.findAllItems()],
        ['2', () => system.addItem()],
        ['3', () => system.findItem()],
        ['4', () => system.removeItem()],
        ['5', () => system.editItem()],
        ['6', menu.principal],
    ]);
    
    let wareItemOptions: Map<string, any> = new Map<string, any>([
        ['M', menu.wareItem],
        ['1', () => system.findAllWareItem()],
        ['2', () => system.findAllWareItemByProperty()],
        ['3', () => system.addwareItem()],
        ['4', () => system.deleteWareItem()],
        ['5', () => system.editWareItem()],
        ['6', () => menu.principal],
    ]);
    
    let optionsMap: Map<string, any> = new Map<string, any>([
        ['1', wareHouseOptions],
        ['2', itemOptions],
        ['3', wareItemOptions],
    ]);
    
    let currentOption: number = -1;
    let selectedMenu: Map<String, any>;
    
    
    while (currentOption != 0) {
        utils.clear();
        try {
            utils.print(menu.principal());
            currentOption = utils.inputNumber('Opção: ');
            if(!utils.isInInterval(currentOption, 1,3)) {
                if(currentOption != 0) utils.print('Opção inválida!');
                if(currentOption === 0) utils.print('Fechando aplicação...');;
                utils.continue();
                utils.clear();
                continue;
            }
            
            if(utils.isInInterval(currentOption, 1, 3)) {
                selectedMenu = optionsMap.get(`${currentOption}`);
                utils.clear()
                utils.print((<Map<string, any>>selectedMenu).get('M')());
                let instruction: number = utils.inputNumber('Opção: ');
                
                if(!utils.isInInterval(instruction, 1,6)) {
                    utils.print('Opção inválida!');
                    utils.continue();
                }
                
                if(utils.isInInterval(instruction, 1,6)) {
                    if(instruction == 6) continue;
                    utils.clear();
                    await selectedMenu.get(`${instruction}`)();
                    utils.continue();
                    utils.clear();
                }
            }
    
        } catch (error) {
                utils.print((<Error>error).message);
        }
    }

})()
