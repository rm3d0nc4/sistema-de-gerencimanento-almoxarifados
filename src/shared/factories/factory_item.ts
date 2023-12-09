
import { IcedItem } from "../../modules/ware_house_item/entities/iced_item";
import { Perishable } from "../../modules/ware_house_item/entities/perishable";
import WarehouseItem from "../../modules/ware_house_item/entities/warehouse_item";

export class FactotyItem {
    static makeItem(data: Map<string, any>): WarehouseItem {
        let item: WarehouseItem;
        if (data.get('EXPIRATION_DATE') != 'null') {
            item = new Perishable({
                id: data.get('WARE_ITEM_ID'),
                item: data.get('ITEM_ID'),
                warehouse: data.get('WAREHOUSE_ID'),
                insertionDate: new Date(<string>data.get('INSERTION_DATE')),
                amount: data.get('AMOUNT'),
                location: data.get('LOCATION'),
                expirationDate: new Date(<string>data.get('EXPIRATION_DATE'))
            });
            return item;
        }

        item = new IcedItem({
            id: data.get('WARE_ITEM_ID'),
            item: data.get('ITEM_ID'),
            warehouse: data.get('WAREHOUSE_ID'),
            insertionDate: new Date(<string>data.get('INSERTION_DATE')),
            amount: data.get('AMOUNT'),
            location: data.get('LOCATION'),
            minumumTemperature: data.get('MINIMUM_TEMPERATURE'),
            maximumTemperature: data.get('MAXIMUM_TEMPERATURE')
        });
        return item;
    }
}
