class NumberUtils {
    isValidNumber(numberStr: string): boolean {
        const regex: RegExp = new RegExp(/^[0-9]+$/);
        return regex.test(numberStr);
    }

    isInInterval(value: number, min: number, max: number) {
        return value <= max && value >= min;
    }


}

export default new NumberUtils();