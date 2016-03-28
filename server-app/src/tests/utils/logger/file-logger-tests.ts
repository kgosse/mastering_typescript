import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import {FileLogger} from "./../../../utils";

describe("FileLogger", () => {
    describe("#log()", () => {
        function fileDoesContainText(fileName: string, expectedText: string, done: MochaDone) {
            fs.readFile(fileName, "utf-8", (err, data) => {
                fs.unlink(fileName, done);
                assert.equal(data, expectedText);
            });
        }

        it("Should log the message to a file", (done) => {
            const testLogFile1 = "test-log-file1.txt";
            const message = "My test message.";

            fs.unlink(testLogFile1, () => {
                new FileLogger(testLogFile1).log(message, () => {
                    fileDoesContainText(testLogFile1, message + os.EOL, done);
                });
            });
        });

        it("Should append message to a file when adding another message", (done) => {
            const testLogFile2 = "test-log-file2.txt";
            const message = "My test message.";

            fs.unlink(testLogFile2, () => {
                const fl = new FileLogger(testLogFile2);

                fl.log(message);
                fl.log(message, () => {
                    fileDoesContainText(testLogFile2, message + os.EOL + message + os.EOL, done);
                });
            });
        });
    });
});
