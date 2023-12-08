class DateUtils {
    isValidDate(dateStr: string): boolean {
        const regex: RegExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        if (dateStr.match(regex) === null) {
            return false;
        }
    
        const date: Date = new Date(dateStr);
        const timestamp: number = date.getTime();
    
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
            return false;
        }
    
        return date.toISOString().startsWith(dateStr);
    }
}

export default new DateUtils();