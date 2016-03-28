import CONFIG from "./config/config";
import {StorageFactory} from "./storage-factory";
import {BaseLogger, ConsoleLogger, FileLogger} from "./utils/loggers";

export class MainFactory {
    private static consoleLogger: ConsoleLogger;
    private static fileLogger: FileLogger;

    static createStorageFactory() {
        return new StorageFactory({
            databaseDir : CONFIG.STORAGE.DIR,
            foodItemsFileName : CONFIG.STORAGE.FOOD_ITEMS_FILE,
            ordersFileName : CONFIG.STORAGE.ORDERS_FILE
        });
    }

    static getLogger(): BaseLogger {
        return MainFactory.getConsoleLogger();
    }

    static getConsoleLogger() {
        return MainFactory.consoleLogger || (MainFactory.consoleLogger = new ConsoleLogger());
    }

    static getFileLogger() {
        return MainFactory.fileLogger || (MainFactory.fileLogger = new FileLogger(CONFIG.LOG.FILE));
    }
}
