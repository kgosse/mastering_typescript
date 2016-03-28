import {NumberHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("NumberHelper", () => {
    describe("#fromatAsCurrency(()", () => {
        it("should start with dollar sign and format to two decimal places", () => {
            assert.equal(NumberHelper.formatAsCurrency(5.3), "$5.30");
        });

        it("should return an empty string when supplying null", () => {
            assert.equal(NumberHelper.formatAsCurrency(null), "");
        });

        it("should format with other symbol when supplied", () => {
            assert.equal(NumberHelper.formatAsCurrency(5, { prefix: "%" }), "%5.00");
        });
    });

    describe("#parseString(()", () => {
        it("should return null when supplying a non-number string", () => {
            assert.equal(NumberHelper.parseString("asdf"), null);
        });

        it("should return null when supplying null", () => {
            assert.equal(NumberHelper.parseString(null), null);
        });

        it("should return a number when supplying a number string", () => {
            assert.equal(NumberHelper.parseString("45"), 45);
        });

        it("should return a zero when supplying a zero as a string", () => {
            assert.equal(NumberHelper.parseString("0"), 0);
        });
    });

    describe("#toString(()", () => {
        it("should return null when supplying null", () => {
            assert.equal(NumberHelper.toString(null), null);
        });

        it("should return a string when supplying a string that's a number", () => {
            assert.equal(NumberHelper.toString("12"), "12");
        });

        it("should return a null when supplying a string that's not a number", () => {
            assert.equal(NumberHelper.toString("asdf"), null);
        });

        it("should return a string as the number when supplying a number", () => {
            assert.equal(NumberHelper.toString(12), "12");
        });
    });

    describe("#isNumber(()", () => {
        it("should return false when supplying a non-number string", () => {
            assert.equal(NumberHelper.isNumber("asdf"), false);
        });

        it("should return false when supplying null", () => {
            assert.equal(NumberHelper.isNumber(null), false);
        });

        it("should return true when supplying a number string", () => {
            assert.equal(NumberHelper.isNumber("45"), true);
        });

        it("should return true when supplying zero as a string", () => {
            assert.equal(NumberHelper.isNumber("0"), true);
        });
    });
});
