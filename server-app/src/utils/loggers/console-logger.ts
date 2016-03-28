import {BaseLogger} from "./base-logger";

export class ConsoleLogger extends BaseLogger {
    log(message: string) {
        console.log(message);
    }
}
