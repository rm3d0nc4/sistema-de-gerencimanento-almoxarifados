class WerehouseUtils {
  // inputProperty(): string {
  //     const menuProperties: string =
  //     "==================== Propriedades ====================" + "\n" +
  //     "[ 1 ] | Id do lote          [ 5 ] | Quantidade"         + "\n" +
  //     "[ 2 ] | Id do Item          [ 6 ] | Localizacao"        + "\n" +
  //     "[ 3 ] | Id do almoxarifado  [ 7 ] | Data de vencimento" + "\n" +
  //     "[ 4 ] | Data de insercao" + "\n"
  //     "Número da propriedade desejada:     "

  //     let mapProperties: Map<string, string> = new Map<string, string>();
  //     mapProperties.set('1','WARE_ITEM_ID');
  //     mapProperties.set('2','ITEM_ID');
  //     mapProperties.set('3','WAREHOUSE_ID');
  //     mapProperties.set('4','INSERTION_DATE');
  //     mapProperties.set('5','AMOUNT');
  //     mapProperties.set('6','LOCATION');
  //     mapProperties.set('7','EXPIRATION_DATE');

  //     console.log(menuProperties);
  //     let selectedProperty: string = input("Número da propriedade desejada:     ");
  //     if (!this.isValidNumber(selectedProperty) || !this.isInInterval(Number(selectedProperty), 1, 7)) {
  //         throw new InputError('Valor de propriedade inválido');
  //     }
  //     return mapProperties.get(selectedProperty);
  //     this.clear();
  // }

  // isInInterval(value: number, min: number, max: number) {
  //     return value <= max && value >= min;
  // }

  // private isValidDate(dateStr: string): boolean {
  //     const regex: RegExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  //     if (dateStr.match(regex) === null) {
  //         return false;
  //     }

  //     const date: Date = new Date(dateStr);
  //     const timestamp: number = date.getTime();

  //     if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
  //         return false;
  //     }

  //     return date.toISOString().startsWith(dateStr);
  // }

  // private isValidText(textStr: string): boolean {
  //     const regex: RegExp = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
  //     return regex.test(textStr);
  // }

  // private isValidNumber(numberStr: string): boolean {
  //     const regex: RegExp = new RegExp(/^[0-9]+$/);
  //     return regex.test(numberStr);
  // }

  isValidLocation(locationStr: string): boolean {
    const regex: RegExp = new RegExp(/C[0-9]+P[0-9]+A[0-9]+$/);
    return regex.test(locationStr);
  }

  isValidWareItemType(wareItemType: string): boolean {
    const regex: RegExp = new RegExp(/[N,P]$/);
    return regex.test(wareItemType.toUpperCase());
  }

  // inputAlphaNumeric(message: string): string {
  //     const value = input(message);
  //     return value;
  // }

  // inputText(message: string,  nullable: boolean = false): string {
  //     const text: string = input(message);

  //     if(nullable === true && text == '') return null;
  //     if(!this.isValidText(text)) {
  //         throw new InputError('Texto inválido!');
  //     }
  //     return text;
  // }

  // inputNumber(message: string, nullable: boolean = false): number {
  //     const inputNumber:string = input(message);

  //     if(nullable === true && inputNumber == '') return null;

  //     if(!this.isValidNumber(inputNumber)) {
  //         throw new InputError('Número inválido!');
  //     }
  //     return Number(inputNumber);
  // }

  // inputLocation(message: string, nullable: boolean = false): string {

  //     const location: string = input(message);

  //     if(nullable === true && location == '') return null;
  //     if(!this.isValidLocation(location.toUpperCase())) {
  //         throw new InputError('Localização inválida');
  //     }
  //     return location.toUpperCase();
  // }

  // inputDate(message:string): Date {
  //     const date: string = input(message);
  //     if(!this.isValidDate(date)) {
  //         throw new InputError('Data inválida!')
  //     }
  //     return new Date(date);
  // }

  // inputWareItemType(message: string): string {
  //     const wareItemType: string = input(message);
  //     if(!this.isValidWareItemType(wareItemType)) {
  //         throw new InputError('Tipo de item inválido')
  //     }

  //     return wareItemType;
  // }

  // continue(): void {
  //     input('<ENTER> para continuar...');
  // }

  // print(message: string):void {
  //     console.log(message);
  // }

  // clear = () => console.clear();

  // stop = () => 0;
}

export default new WerehouseUtils();
