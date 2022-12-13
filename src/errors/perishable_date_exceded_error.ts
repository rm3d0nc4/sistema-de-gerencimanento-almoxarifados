import AplicacaoError from "./aplication_error";

export default class PerishableExpiredError extends AplicacaoError{
    constructor(message: string) {
        super(message);
    } 
}