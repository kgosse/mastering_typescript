import {EventEmitter} from "./../../scripts/utils";
import * as assert from "assert";

describe("EventEmitter", () => {
    describe("#on()", () => {
        it("should add an event to the list of events", () => {
            let eventEmitter = new EventEmitter();
            let wasCalled = false;

            let myEvent = () => {
                wasCalled = true;
            };

            eventEmitter.on(myEvent);
            eventEmitter.emit();
            assert.equal(wasCalled, true);
        });

        it("should not add an event twice", () => {
            let eventEmitter = new EventEmitter();
            let numberOfTimesCalled = 0;

            let myEvent = () => {
                numberOfTimesCalled++;
            };

            eventEmitter.on(myEvent);
            eventEmitter.on(myEvent);
            eventEmitter.emit();
            assert.equal(numberOfTimesCalled, 1);
        });
    });

    describe("#off()", () => {
        it("should remove the event that was added", () => {
            let eventEmitter = new EventEmitter();
            let wasCalled = false;

            let myEvent = () => {
                wasCalled = true;
            };

            eventEmitter.on(myEvent);
            eventEmitter.off(myEvent);
            eventEmitter.emit();
            assert.equal(wasCalled, false);
        });
    });

    describe("#emit()", () => {
        it("should call the functions with a specific 'this' value", () => {
            let myObj = { testValue: true };
            let eventEmitter = new EventEmitter(myObj);

            let myEvent = function() {
                assert.deepEqual(this, myObj);
            };

            eventEmitter.on(myEvent);
            eventEmitter.emit();
        });
    });
});
