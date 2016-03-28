import {DateHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("DateHelper", () => {
    describe("#toLongDateString()", () => {
        it("should format as Do MMM YYYY", () => {
            assert.equal(DateHelper.toLongDateString(new Date(2015, 0, 25)), "25th Jan 2015");
        });

        it("should return an empty string", () => {
            assert.equal(DateHelper.toLongDateString(null), "");
        });
    });

    describe("#toShortDateString()", () => {
        it("should format as MM-DD-YYYY", () => {
            assert.equal(DateHelper.toShortDateString(new Date(2015, 0, 25)), "01/25/2015");
        });

        it("should return an empty string", () => {
            assert.equal(DateHelper.toShortDateString(null), "");
        });
    });
});
