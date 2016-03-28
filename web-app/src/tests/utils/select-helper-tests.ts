import {SelectHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("SelectHelper", () => {
    enum DummyEnum {
        DummyProp1 = 0,
        DummyProp2 = 3
    }

    function valueToString(dummyEnum: DummyEnum) {
        switch (dummyEnum) {
            case DummyEnum.DummyProp1:
                return "Text1";
            case DummyEnum.DummyProp2:
                return "Text2";
            default:
                throw new Error(`Not implemented dummyEnum value: ${dummyEnum}`);
        }
    }

    describe("#enumToOptions()", () => {
        it("should return the names of the enum in an array", () => {
            const options = SelectHelper.enumToOptions(DummyEnum, valueToString);
            assert.equal(options.length, 2);
            assert.equal(options[0].text, "Text1");
            assert.equal(options[0].value, 0);
            assert.equal(options[1].text, "Text2");
            assert.equal(options[1].value, 3);
        });
    });
});
