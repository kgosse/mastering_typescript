import config from "./config-default";
import * as path from "path";
import {ConfigStructure} from "./structure/config-structure";

const currentDir = path.resolve(__dirname);

// deep clone
const testConfig = JSON.parse(JSON.stringify(config)) as ConfigStructure;
// test specific changes to configuration
testConfig.STORAGE.DIR = path.join(currentDir, "../storage/data-tests");

export default testConfig;
