var crypto = require('crypto');
export class Utils {
    static hash(text: string): string {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
    public static isValidId(id: any, zeroAllowed = false): boolean {
        if (id !== null && id !== undefined && isFinite(id) && (zeroAllowed || (id > 0))) {
            return true;
        }
        return false;
    }
    public static ifNullThrow(x: any, message: string): void {
        if (x == null || x == undefined) {
            throw new Error(message);
        }
    }

    public static timeStamp(timeZoneName: boolean = false): string {
        let date = new Date();
        let dateStr = date.toDateString();
        let timeStr = date.toTimeString();
        if (timeZoneName == false) {
            try {
                timeStr = timeStr.split(' (')[0];
            } catch (e) { }
        }
        let timeStamp: string = `${dateStr} ${timeStr}`;
        return timeStamp;
    }
}