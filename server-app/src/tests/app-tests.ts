import "./../utils/polyfills";
import {TestFactory} from "./test-factory";

before(() => {
    // cleanup
    TestFactory.deleteStorageDir();
});
