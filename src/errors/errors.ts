export class AplicacaoError extends Error{
    constructor(message: string) {
        super(message);
    }
}

export class InputError extends AplicacaoError {
    constructor(message: string) {
        super(message);
    }
}


