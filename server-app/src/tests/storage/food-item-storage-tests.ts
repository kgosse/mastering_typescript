import * as assert from "assert";
import {FoodItem} from "./../../models";
import {getDummyFoodItem} from "./../dummies";
import {TestFactory} from "./../test-factory";

function getStorage() {
    return TestFactory.createStorageFactory().createFoodItemStorage();
}

describe("FoodItemStorage", () => {
    describe("#insertUpdate()", () => {
        it("should set the primary key after inserting into the database", (done) => {
            const insertItem = getDummyFoodItem();

            getStorage().then(foodItemStorage => {
                assert.equal(insertItem.foodItemID, null);
                foodItemStorage.insertUpdate(insertItem).then(() => {
                    assert.notEqual(insertItem.foodItemID, null);
                    done();
                });
            });
        });

        it("should insert then update the value in the database", (done) => {
            const insertItem = getDummyFoodItem();

            getStorage().then(foodItemStorage => {
                foodItemStorage.insertUpdate(insertItem).then(() => {
                    const updateItem = JSON.parse(JSON.stringify(insertItem)) as FoodItem;

                    foodItemStorage.insertUpdate(updateItem).then(() => {
                        assert.equal(updateItem.foodItemID, insertItem.foodItemID);
                        done();
                    });
                });
            });
        });
    });

    describe("#list()", () => {
        it("should list items inserted", (done) => {
            const insertItem = getDummyFoodItem();

            getStorage().then(foodItemStorage => {
                foodItemStorage.insertUpdate(insertItem).then(() => {
                    foodItemStorage.list().then(foodItems => {
                        assert.equal(foodItems.length, 1);
                        done();
                    });
                });
            });
        });
    });

    describe("#remove()", () => {
        it("should remove the inserted item", (done) => {
            const insertItem = getDummyFoodItem();

            getStorage().then(foodItemStorage => {
                foodItemStorage.insertUpdate(insertItem).then(() => {
                    foodItemStorage.remove(insertItem.foodItemID).then(() => {
                        foodItemStorage.list().then(foodItems => {
                            assert.equal(foodItems.length, 0);
                            done();
                        });
                    });
                });
            });
        });
    });
});
