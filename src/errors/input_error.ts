import AplicacaoError from "./aplication_error";


export class InputError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}


