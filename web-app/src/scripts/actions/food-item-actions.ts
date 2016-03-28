import {FoodItem} from "./../server";

export class ShowFoodItemListAction {
}

export class ShowFoodItemEditAction {
    constructor(public foodItem?: FoodItem) {
    }
}

export class SaveFoodItemAction {
    constructor(public foodItem: FoodItem) {
    }
}

export class RemoveFoodItemAction {
    constructor(public foodItemID: string) {
    }
}
