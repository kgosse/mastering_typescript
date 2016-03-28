import * as assert from "assert";
import {DummyLogger} from "./../../dummies";
import {BaseLog} from "./../../../utils";

describe("BaseLog", () => {
    it("should log the method name, arguments, and return value", () => {
        const dummyLogger = new DummyLogger();
        class TestClass {
            @BaseLog(dummyLogger)
            testMethod(str: string) {
                return "test";
            }
        }

        new TestClass().testMethod("s");

        assert.equal(
                dummyLogger.getLastLoggedMessage(),
                `Called 'testMethod'\n` +
                `Arguments: ["s"]\n` +
                `Return value: "test"`);
    });
});
