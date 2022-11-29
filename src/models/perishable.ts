import { Item } from "./item";

export class Perishable extends Item {
    private _expirationDate: Date;
    
    constructor(id: number, description: string, insertionDate: Date, amount: number, location: string, expirationDate: Date) {
        super(id, description, insertionDate, amount, location);
        this._expirationDate = expirationDate;
    }

    get expirationDate(): Date {
        return this._expirationDate;
    }

    set setExpirationDate(date: Date) {
        this._expirationDate = date;
    }

}