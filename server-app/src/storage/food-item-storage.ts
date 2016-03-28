import {DatabaseWrapper} from "./../utils";
import {FoodItem} from "./../models";

export class FoodItemStorage {
    constructor(private foodItemDB: DatabaseWrapper<FoodItem>) {
    }

    list() {
        return this.foodItemDB.list();
    }

    insertUpdate(foodItem: FoodItem) {
        return this.foodItemDB.insertUpdate(foodItem);
    }

    remove(foodItemID: string) {
        return this.foodItemDB.remove(foodItemID);
    }
}
