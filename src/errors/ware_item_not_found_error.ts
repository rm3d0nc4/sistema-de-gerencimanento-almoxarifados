import AplicacaoError from "./aplication_error";

export default class WarehouseItemNotFoundError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}