import AplicacaoError from "./aplication_error";

export default  class ItemNotFoundError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}