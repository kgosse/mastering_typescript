/// <reference path="../../node_modules/server-bridge/server-bridge.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import {MainFactory} from "./../main-factory";
import {FoodItem} from "./../models";
import {Use, Get, Post, Routes} from "server-bridge";

@Use("/food-items")
export class FoodItemRoutes extends Routes {
    @Get("/list")
    list() {
        return MainFactory.createStorageFactory().createFoodItemStorage().then((foodItemStorage) => {
            return foodItemStorage.list();
        });
    }

    @Post("/remove")
    remove(opts: { foodItemID: string }) {
        return MainFactory.createStorageFactory().createFoodItemStorage().then((foodItemStorage) => {
            return foodItemStorage.remove(opts.foodItemID);
        });
    }

    @Post("/")
    set(foodItem: FoodItem) {
        return MainFactory.createStorageFactory().createFoodItemStorage().then((foodItemStorage) => {
            return foodItemStorage.insertUpdate(foodItem);
        });
    }
}
