import { Utils } from "./utils";

export class Logger {

    private static join(slices: string[]): string {
        let body = slices.map(s => `[${s}]`).join(" ");
        return body;
    }

    public static info(message: string): void {
        let msg: string = this.join([
            "INFO",
            Utils.timeStamp(),
            message
        ]);
        console.info(msg);
    }

    public static error(message: string) {
        let msg: string = this.join([
            "ERROR",
            Utils.timeStamp(),
            message
        ]);
        console.error(msg);
    }
}