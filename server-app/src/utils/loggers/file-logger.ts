import {BaseLogger} from "./base-logger";
import * as fs from "fs";
import * as os from "os";

export class FileLogger extends BaseLogger {
    constructor(private fileName: string) {
        super();
    }

    log(message: string, onFinished?: (err: NodeJS.ErrnoException) => void) {
        fs.appendFile(this.fileName, message + os.EOL, onFinished);
    }
}
