import * as assert from "assert";
import * as request from "supertest";
import app from "./../../app";
import {FoodItem} from "./../../models";
import {getDummyFoodItem} from "./../dummies";

describe("app food-items", () => {
    function insertTest(onFinish: (err: any, foodItem: FoodItem) => void) {
        request(app)
            .post("/food-items")
            .send(getDummyFoodItem())
            .expect(200)
            .end((err: any, res: request.Response) => {
                const foodItem = res.body as FoodItem;
                assert.notEqual(foodItem.foodItemID, null);
                onFinish(err, foodItem);
            });
    }

    describe("GET /list" , () => {
        it("should successfully request the list method", done => {
            insertTest((err, foodItem) => {
                request(app)
                    .get(`/food-items/list`)
                    .expect(200, done);
            });
        });
    });

    describe("POST /" , () => {
        it("should insert the food item", done => {
            insertTest((err, foodItem) => done(err));
        });
    });

    describe("POST /remove" , () => {
        it("should successfully requre the remove method", done => {
            insertTest((err, foodItem) => {
                request(app)
                    .post(`/food-items/remove`)
                    .send({ foodItemID: foodItem.foodItemID })
                    .expect(200, done);
            });
        });
    });
});
