import * as assert from "assert";
import * as express from "express";
import {DummyLogger} from "./../../dummies";

describe("BaseLogger", () => {
    describe("#log()", () => {
        it("Should log the message passed in", () => {
            const dummyLogger = new DummyLogger();
            const message = "My test message.";
            dummyLogger.log(message);

            assert.equal(dummyLogger.getLastLoggedMessage(), message);
        });
    });

    describe("#logRequest()", () => {
        it("Should log the request", () => {
            const dummyLogger = new DummyLogger();
            const ip = "192.168.0.1";
            const originalUrl = "/test";

            dummyLogger.logRequest({
                ip: ip,
                originalUrl: originalUrl
            } as express.Request);

            assert.equal(dummyLogger.getLastLoggedMessage(), `Request from ${ip} to ${originalUrl}`);
        });
    });
});
