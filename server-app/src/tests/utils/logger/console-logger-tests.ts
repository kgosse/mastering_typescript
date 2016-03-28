import * as assert from "assert";
import {ConsoleLogger} from "./../../../utils";

describe("ConsoleLogger", () => {
    describe("#log()", () => {
        it("Should log the message to the console", () => {
            let lastLog: string;
            const originalConsoleLog = console.log;
            const message = "My test message.";

            console.log = (msg: string) => lastLog = msg;

            new ConsoleLogger().log(message);
            assert.equal(lastLog, message);

            console.log = originalConsoleLog;
        });
    });
});
