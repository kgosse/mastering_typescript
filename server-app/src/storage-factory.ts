import {DatabaseWrapper} from "./utils/database-wrapper";
import {FoodItemStorage} from "./storage/food-item-storage";
import {OrderStorage} from "./storage/order-storage";
import {FoodItem, Order} from "./models";

export class StorageFactory {
    constructor(private config: { databaseDir: string, foodItemsFileName: string, ordersFileName: string }) {
    }

    createFoodItemStorage() {
        return this.createWrapper<FoodItem>(this.config.foodItemsFileName, "foodItemID")
                   .then(dbWrapper => new FoodItemStorage(dbWrapper));
    }

    createOrderStorage() {
        return this.createWrapper<Order>(this.config.ordersFileName, "orderID")
                   .then(dbWrapper => new OrderStorage(dbWrapper));
    }

    private createWrapper<T>(dbFileName: string, primaryKeyPropertyName: string) {
        return DatabaseWrapper.getInstance<T>({
            dir: this.config.databaseDir,
            fileName: dbFileName,
            primaryKeyPropertyName: primaryKeyPropertyName
        });
    }
}
