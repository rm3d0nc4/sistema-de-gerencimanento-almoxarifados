export class WareHouse {
    private _id: number;
    private _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }
    
    static fromObject(data: Object) {
        let values: Array<any> = Object.values(data);
        return new WareHouse(values[0], values[1]);
    }
}
