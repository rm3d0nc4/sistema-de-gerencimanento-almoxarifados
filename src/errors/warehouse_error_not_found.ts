import { AplicacaoError } from "./input_error";

class WarehouseNotFoundError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}