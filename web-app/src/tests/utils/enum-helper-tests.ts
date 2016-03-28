import {EnumHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("EnumHelper", () => {
    enum DummyEnum {
        DummyProp1 = 0,
        DummyProp2 = 3
    }

    describe("#getNames()", () => {
        it("should return the names of the enum in an array", () => {
            const names = EnumHelper.getNames(DummyEnum);
            assert.equal(names.length, 2);
            assert.equal(names[0], "DummyProp1");
            assert.equal(names[1], "DummyProp2");
        });
    });

    describe("#getValues()", () => {
        it("should return the values of the enum in an array", () => {
            const values = EnumHelper.getValues(DummyEnum);
            assert.equal(values.length, 2);
            assert.equal(values[0], 0);
            assert.equal(values[1], 3);
        });
    });

    describe("#getNamesAndValues()", () => {
        it("should return the names and values of the enum in an array", () => {
            const nameAndValues = EnumHelper.getNamesAndValues(DummyEnum);
            assert.equal(nameAndValues.length, 2);
            assert.equal(nameAndValues[0].value, 0);
            assert.equal(nameAndValues[0].name, "DummyProp1");
            assert.equal(nameAndValues[1].value, 3);
            assert.equal(nameAndValues[1].name, "DummyProp2");
        });
    });
});
