import * as assert from "assert";
import * as request from "supertest";
import app from "./../../app";
import {Order} from "./../../models";
import {getDummyOrder} from "./../dummies";

describe("app orders", () => {
    function insertTest(onFinish: (err: any, order: Order) => void) {
        request(app)
            .post("/orders")
            .send(getDummyOrder())
            .expect(200)
            .end((err: any, res: request.Response) => {
                const order = res.body as Order;
                assert.notEqual(order.orderID, null);
                onFinish(err, order);
            });
    }

    describe("GET /list" , () => {
        it("should successfully request the list method", done => {
            insertTest((err, order) => {
                request(app)
                    .get(`/orders/list`)
                    .expect(200, done);
            });
        });
    });

    describe("POST /" , () => {
        it("should insert the food item", done => {
            insertTest((err, order) => done(err));
        });
    });

    describe("POST /remove" , () => {
        it("should successfully request the remove method", done => {
            insertTest((err, order) => {
                request(app)
                    .post(`/orders/remove`)
                    .send({ orderID: order.orderID })
                    .expect(200, done);
            });
        });
    });
});
