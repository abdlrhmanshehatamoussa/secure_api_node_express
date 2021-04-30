import * as dotenv from "dotenv";

export class Configurations {
    public static instance: Configurations = new Configurations();

    private initialized: boolean = false;

    private Configuraitons() {
    }

    public init(path: string): void {
        const result = dotenv.config({ path: path })
        if (result.error) {
            throw new Error(`Error while loading configurations: ${result.error}`)
        }
        this.initialized = true;
    }

    private getFromEnv(key: string): string {
        if (!this.initialized) {
            throw new Error("Configurations have not been initialized yet");
        }
        let v: string = process.env[key];
        if (v !== null && v !== undefined) {
            return v;
        }
        throw new Error(`Missing environmental variable [${key}]`);
    }

    public get env(): string {
        return this.getFromEnv("API_ENV");
    }

    public get apiPort(): string {
        return this.getFromEnv("API_PORT");
    }
    public get appVersion(): string {
        return this.getFromEnv("API_VERSION");
    }
}