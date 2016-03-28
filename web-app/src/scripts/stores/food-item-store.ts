import {AppDispatcher} from "./../app-dispatcher";
import {SaveFoodItemAction, RemoveFoodItemAction} from "./../actions";
import {BaseStore} from "./base";
import {FoodItem, FoodItemStatus} from "./../server";
import {ServerFactory} from "./../server-factory";
import {SelectInputOption} from "./../components";

let foodItems: { [foodItemID: string]: FoodItem } = {};

// private
function setFoodItems(...items: FoodItem[]) {
    items.forEach(addFoodItem);
}

function addFoodItem(foodItem: FoodItem) {
    foodItems[foodItem.foodItemID] = foodItem;
}

function removeFoodItem(foodItemID: string) {
    delete foodItems[foodItemID];
}

// public
export class FoodItemStore extends BaseStore {
    static get(foodItemID: string) {
        return foodItems[foodItemID];
    }

    static getAll() {
        return Object.keys(foodItems).map(foodItemID => foodItems[foodItemID]);
    }

    static getForSelect(): SelectInputOption[] {
        return FoodItemStore.getAll()
            .filter(foodItem => foodItem.status === FoodItemStatus.Active)
            .map(foodItem => {
                return {
                    text: foodItem.name,
                    value: foodItem.foodItemID
                };
            });
    }
}

// actions to listen for
AppDispatcher.register(SaveFoodItemAction, (action) => {
    ServerFactory.getServerFoodItems().set(action.foodItem).then((returnResult) => {
        addFoodItem(returnResult);
        FoodItemStore.emitChange();
    });
});

AppDispatcher.register(RemoveFoodItemAction, (action) => {
    ServerFactory.getServerFoodItems().remove({ foodItemID: action.foodItemID }).then((result) => {
        removeFoodItem(action.foodItemID);
        FoodItemStore.emitChange();
    });
});

ServerFactory.getServerFoodItems().list().then((returnedItems) => {
    setFoodItems(...returnedItems);
    FoodItemStore.emitChange();
});
