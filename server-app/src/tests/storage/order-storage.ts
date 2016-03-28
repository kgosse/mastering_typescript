import * as assert from "assert";
import {Order} from "./../../models";
import {getDummyOrder} from "./../dummies";
import {TestFactory} from "./../test-factory";

function getStorage() {
    return TestFactory.createStorageFactory().createOrderStorage();
}

describe("OrderStorage", () => {
    describe("#insertUpdate()", () => {
        it("should set the primary key after inserting into the database", (done) => {
            const insertItem = getDummyOrder();

            getStorage().then(orderStorage => {
                assert.equal(insertItem.orderID, null);
                orderStorage.insertUpdate(insertItem).then(() => {
                    assert.notEqual(insertItem.orderID, null);
                    done();
                });
            });
        });

        it("should insert then update the value in the database", (done) => {
            const insertItem = getDummyOrder();

            getStorage().then(orderStorage => {
                orderStorage.insertUpdate(insertItem).then(() => {
                    const updateItem = JSON.parse(JSON.stringify(insertItem)) as Order;

                    orderStorage.insertUpdate(updateItem).then(() => {
                        assert.equal(updateItem.orderID, insertItem.orderID);
                        done();
                    });
                });
            });
        });
    });

    describe("#list()", () => {
        it("should list items inserted", (done) => {
            const insertItem = getDummyOrder();

            getStorage().then(orderStorage => {
                orderStorage.insertUpdate(insertItem).then(() => {
                    orderStorage.list().then(orders => {
                        assert.equal(orders.length, 1);
                        done();
                    });
                });
            });
        });
    });

    describe("#remove()", () => {
        it("should remove the inserted item", (done) => {
            const insertItem = getDummyOrder();

            getStorage().then(orderStorage => {
                orderStorage.insertUpdate(insertItem).then(() => {
                    orderStorage.remove(insertItem.orderID).then(() => {
                        orderStorage.list().then(orders => {
                            assert.equal(orders.length, 0);
                            done();
                        });
                    });
                });
            });
        });
    });
});
