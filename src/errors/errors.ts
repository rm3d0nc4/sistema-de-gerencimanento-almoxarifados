export class ExpirationDateErrors extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class LowInventoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InventoryError extends Error {
    constructor(message: string) {
        super(message);
    }
}