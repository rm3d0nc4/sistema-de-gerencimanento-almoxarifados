import AplicacaoError from "./aplication_error";

class WarehouseNotFoundError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}