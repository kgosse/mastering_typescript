// do not edit - file copied from server-app
import {FoodItemStatus} from "./enums";

export interface FoodItem {
    foodItemID: string;
    name: string;
    price: number;
    status: FoodItemStatus;
}
