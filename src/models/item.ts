export class Item {
    private _id: number;
    private _description: string;
    private _insertionDate: Date;
    private _amount: number;
    private _location: string;

    constructor(id: number, description: string, insertionDate: Date, amount: number, location: string) {
        this._id = id;
        this._description = description;
        this._insertionDate = insertionDate;
        this._amount = amount;
        this._location = location;
    }


    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get insertionDate() {
        return this._insertionDate;
    }

    get amount() {
        return this._amount;
    }

    get location() {
        return this._location;
    }
}