import {StringHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("StringHelper", () => {
    describe("#isNullOrWhitespace()", () => {
        it("should return true for null", () => {
            assert.equal(StringHelper.isNullOrWhitespace(null), true);
        });

        it("should return true for undefined", () => {
            assert.equal(StringHelper.isNullOrWhitespace(undefined), true);
        });

        it("should return true for an empty string", () => {
            assert.equal(StringHelper.isNullOrWhitespace(""), true);
        });

        it("should return true for a string with only whitepsace", () => {
            assert.equal(StringHelper.isNullOrWhitespace(" "), true);
        });

        it("should return false for a string with something other than whitepsace", () => {
            assert.equal(StringHelper.isNullOrWhitespace("  d   "), false);
        });
    });
});
