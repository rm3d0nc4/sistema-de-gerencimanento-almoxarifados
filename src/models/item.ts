
export default class Item {
    private _id: number;
    private _description: string;

    constructor(id: number, description: string) {
            this._id = id;
            this._description = description;
    }
    
    get id(): number {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    set id(newId: number){
        this._id = newId;
    }

    set description(newDescription: string) {
        this._description = newDescription;
    }

    toList(): Array<any> {
        let objectList: Array<any> = new Array();
        objectList[0] = this._id;
        objectList[1] = this._description;
        return objectList;
    }

    static fromObject(data: Object): Item {
        let values: any[]= Object.values(data);
        let item: Item = new Item(values[0], values[1]);

        return item;
    }

}