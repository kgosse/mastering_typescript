import {BaseLogger} from "../../utils";

export class DummyLogger extends BaseLogger {
    private lastLog: string;

    constructor() {
        super();
    }

    log(message: string) {
        this.lastLog = message;
    }

    getLastLoggedMessage() {
        return this.lastLog;
    }
}
