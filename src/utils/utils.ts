import promptSync from 'prompt-sync';
import { InputError } from '../errors/input_error';

const input: promptSync.Prompt = promptSync();

class Utils {
    inputProperty(): string {
        const menuProperties: string =  `
        ==============================
        ======== Propriedades ========
        ==============================
          [ 1 ] | Id do lote      
          [ 2 ] | Id do Item 
          [ 3 ] | Id do almoxarifado  
          [ 4 ] | Data de insercao
          [ 5 ] | Quantidade 
          [ 6 ] | Localizacao
          [ 7 ] | Data de vencimento
        ==============================
        Número da propriedade desejada:     
        `;

        let mapProperties: Map<string, string> = new Map<string, string>();
        mapProperties.set('1','WARE_ITEM_ID');
        mapProperties.set('2','ITEM_ID');
        mapProperties.set('3','WAREHOUSE_ID');
        mapProperties.set('4','INSERTION_DATE');
        mapProperties.set('5','AMOUNT');
        mapProperties.set('6','LOCATION');
        mapProperties.set('7','EXPIRATION_DATE');

        let selectedProperty: string = input(menuProperties)
        if (!this.isValidNumber(selectedProperty) || !this.isInInterval(Number(selectedProperty), 1, 7)) {
            throw new InputError('Valor de propriedade inválido');
        }
        return mapProperties.get(selectedProperty);
    }

    private isInInterval(value: number, min: number, max: number) {
        return value <= max && value >= min;
    }
    private isValidDate(dateStr: string): boolean {
        const regex: RegExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if (dateStr.match(regex) === null) {
            return false;
        }
    
        const date: Date = new Date(dateStr);
        const timestamp: number = date.getTime();
    
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }
    
        return date.toISOString().startsWith(dateStr);
    }

    private isValidText(textStr: string): boolean {
        const regex: RegExp = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
        return regex.test(textStr);
    }

    private isValidNumber(numberStr: string): boolean {
        const regex: RegExp = new RegExp(/^[0-9]+$/);
        return regex.test(numberStr);
    }

    private isValidLocation(locationStr: string): boolean {
        const regex: RegExp = new RegExp(/C[0-9]+P[0-9]+A[0-9]+$/);
        return regex.test(locationStr);
    }

    private isValidWareItemType(wareItemType: string): boolean {
        const regex: RegExp = new RegExp(/[N,P]$/);
        return regex.test(wareItemType.toUpperCase())
    }

    inputAlphaNumeric(message: string): string {
        const value = input(message);
        return value;
    } 

    inputText(message: string,  nullable: boolean = false): string {
        const text: string = input(message);

        if(nullable === true && text == '') return null;
        if(!this.isValidText(text)) {
            throw new InputError('Texto inválido!');
        }
        return text;
    }

    inputNumber(message: string, nullable: boolean = false): number {
        const inputNumber:string = input(message);

        if(nullable === true && inputNumber == '') return null;

        if(!this.isValidNumber(inputNumber)) {
            throw new InputError('Número inválido!');
        }
        return Number(inputNumber);
    }

    inputLocation(message: string, nullable: boolean = false): string {

        const location: string = input(message);

        if(nullable === true && location == '') return null;
        if(!this.isValidLocation(location)) {
            throw new InputError('Localização inválida');
        }
        return location;
    }

    inputDate(message:string): Date {
        const date: string = input(message);
        if(!this.isValidDate(date)) {
            throw new InputError('Data inválida!')
        }
        return new Date(date);
    }

    inputWareItemType(message: string): string {
        const wareItemType: string = input(message);
        if(!this.isValidWareItemType(wareItemType)) {
            throw new InputError('Tipo de item inválido')
        }

        return wareItemType;
    }


}

export default new Utils();