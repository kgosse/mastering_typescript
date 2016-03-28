import {FoodItemStatus} from "./../server";

export function getFoodItemStatusString(foodItemStatus: FoodItemStatus) {
    switch (foodItemStatus) {
        case null:
            return "";
        case FoodItemStatus.Active:
            return "Active";
        case FoodItemStatus.Inactive:
            return "Inactive";
        default:
            throw new Error(`Not implemented value: ${foodItemStatus}`);
    }
}
