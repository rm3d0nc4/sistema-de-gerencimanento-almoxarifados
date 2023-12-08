import promptSync from "prompt-sync";
import { InputError } from "../errors/input_error";
import numberUtils from "./numberUtils";
import consoleUtils from "./consoleUtils";
import textUtils from "./textUtils";
import werehouseUtils from "./werehouseUtils";
import dateUtils from "./dateUtils";

const input: promptSync.Prompt = promptSync();

class InputUtils {
  inputProperty(): string {
    const menuProperties: string =
      "==================== Propriedades ====================" +
      "\n" +
      "[ 1 ] | Id do lote          [ 5 ] | Quantidade" +
      "\n" +
      "[ 2 ] | Id do Item          [ 6 ] | Localizacao" +
      "\n" +
      "[ 3 ] | Id do almoxarifado  [ 7 ] | Data de vencimento" +
      "\n" +
      "[ 4 ] | Data de insercao" +
      "\n";
    ("Número da propriedade desejada:     ");

    let mapProperties: Map<string, string> = new Map<string, string>();
    mapProperties.set("1", "WARE_ITEM_ID");
    mapProperties.set("2", "ITEM_ID");
    mapProperties.set("3", "WAREHOUSE_ID");
    mapProperties.set("4", "INSERTION_DATE");
    mapProperties.set("5", "AMOUNT");
    mapProperties.set("6", "LOCATION");
    mapProperties.set("7", "EXPIRATION_DATE");

    console.log(menuProperties);
    let selectedProperty: string = input(
      "Número da propriedade desejada:     "
    );
    if (
      !numberUtils.isValidNumber(selectedProperty) ||
      !numberUtils.isInInterval(Number(selectedProperty), 1, 7)
    ) {
      throw new InputError("Valor de propriedade inválido");
    }
    return mapProperties.get(selectedProperty);
    consoleUtils.clear();
  }

  inputText(message: string, nullable: boolean = false): string {
    const text: string = input(message);

    if (nullable === true && text == "") return null;
    if (!textUtils.isValidText(text)) {
      throw new InputError("Texto inválido!");
    }
    return text;
  }

  inputAlphaNumeric(message: string): string {
    const value = input(message);
    return value;
  }

  inputNumber(message: string, nullable: boolean = false): number {
    const inputNumber: string = input(message);

    if (nullable === true && inputNumber == "") return null;

    if (!numberUtils.isValidNumber(inputNumber)) {
      throw new InputError("Número inválido!");
    }
    return Number(inputNumber);
  }

  inputLocation(message: string, nullable: boolean = false): string {
    const location: string = input(message);

    if (nullable === true && location == "") return null;
    if (!werehouseUtils.isValidLocation(location.toUpperCase())) {
      throw new InputError("Localização inválida");
    }
    return location.toUpperCase();
  }

  inputDate(message: string): Date {
    const date: string = input(message);
    if (!dateUtils.isValidDate(date)) {
      throw new InputError("Data inválida!");
    }
    return new Date(date);
  }

  inputWareItemType(message: string): string {
    const wareItemType: string = input(message);
    if (!werehouseUtils.isValidWareItemType(wareItemType)) {
      throw new InputError("Tipo de item inválido");
    }

    return wareItemType;
  }

  continue(): void {
    input("<ENTER> para continuar...");
  }
  
}

export default new InputUtils();
