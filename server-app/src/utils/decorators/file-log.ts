import {BaseLog} from "./base-log";
import {MainFactory} from "./../../main-factory";

export function FileLog() {
    return BaseLog(MainFactory.getFileLogger());
}
