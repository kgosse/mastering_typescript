import {FoodItemStatus} from "./enums";

export interface FoodItem {
    foodItemID: string;
    name: string;
    price: number;
    status: FoodItemStatus;
}
