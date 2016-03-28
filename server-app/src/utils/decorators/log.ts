import {BaseLog} from "./base-log";
import {MainFactory} from "./../../main-factory";

export function Log() {
    return BaseLog(MainFactory.getLogger());
}
