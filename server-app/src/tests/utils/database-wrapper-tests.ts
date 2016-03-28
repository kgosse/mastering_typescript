import * as assert from "assert";
import {DatabaseWrapper} from "./../../utils/database-wrapper";
import config from "./../../config/config";

describe("DatabaseWrapper", () => {
    interface MockObject {
        id: string;
        prop: string;
    }

    let currentInstanceNumber = 0;

    function getInstance() {
        return DatabaseWrapper.getInstance<MockObject>({
            dir: config.STORAGE.DIR,
            fileName: "db-wrapper" + currentInstanceNumber++,
            primaryKeyPropertyName: "id"
        });
    }

    function getMockObject(propValue: string): MockObject {
        return {
            id: null,
            prop: propValue
        };
    }

    describe("#insertUpdate()", () => {
        it("should insert when no queryOrPrimaryKey specified", done => {
            getInstance().then(db => {
                const val = "val";
                db.insertUpdate(getMockObject(val)).then((mockObject) => {
                    assert.notEqual(mockObject.id, null);
                    assert.equal(mockObject.prop, val);
                    done();
                });
            });
        });

        it("should update when no queryOrPrimaryKey is specified", done => {
            getInstance().then(db => {
                const val = "val";
                db.insertUpdate(getMockObject(val)).then((insertedObject) => {
                    const newVal = "newVal";
                    insertedObject.prop = newVal;
                    db.insertUpdate(insertedObject).then(updatedObject => {
                        assert.equal(updatedObject.id, insertedObject.id);
                        assert.equal(updatedObject.prop, newVal);
                        done();
                    });
                });
            });
        });
    });

    describe("#list()", () => {
        it("should return the items from the database", done => {
            getInstance().then(db => {
                const val = "val";
                db.insertUpdate(getMockObject(val)).then((insertedObject) => {
                    db.list().then(selectedObjects => {
                        assert.equal(selectedObjects[0].id, insertedObject.id);
                        assert.equal(selectedObjects[0].prop, val);
                        done();
                    });
                });
            });
        });
    });

    describe("#remove()", () => {
        it("should remove an item from the database", done => {
            getInstance().then(db => {
                const val = "val";
                db.insertUpdate(getMockObject(val)).then((insertedObject) => {
                    db.remove(insertedObject.id).then(() => {
                        db.list().then(selectedObjects => {
                            assert.equal(selectedObjects.length, 0);
                            done();
                        });
                    });
                });
            });
        });
    });
});
