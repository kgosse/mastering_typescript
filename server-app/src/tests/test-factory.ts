import * as rimraf from "rimraf";
import CONFIG from "./test-config";
import {StorageFactory} from "./../storage-factory";

export class TestFactory {
    private static uniqueID = 0;

    static createStorageFactory() {
        this.uniqueID++;

        return new StorageFactory({
            databaseDir: CONFIG.STORAGE.DIR,
            foodItemsFileName: CONFIG.STORAGE.FOOD_ITEMS_FILE + this.uniqueID,
            ordersFileName: CONFIG.STORAGE.ORDERS_FILE + this.uniqueID
        });
    }

    static deleteStorageDir() {
        rimraf.sync(CONFIG.STORAGE.DIR);
    }
}
