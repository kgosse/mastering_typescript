import {BaseLog} from "./base-log";
import {MainFactory} from "./../../main-factory";

export function ConsoleLog() {
    return BaseLog(MainFactory.getConsoleLogger());
}
