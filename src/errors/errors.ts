export class InventoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ExpirationDateErrors extends InventoryError {
    constructor(message: string) {
        super(message);
    }
}

export class LowInventoryError extends InventoryError {
    constructor(message: string) {
        super(message);
    }
}
