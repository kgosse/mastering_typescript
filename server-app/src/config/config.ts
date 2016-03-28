import {ConfigStructure} from "./structure/config-structure";
import ConfigDefault from "./config-default";
import ConfigTest from "./config-test";

let config: ConfigStructure;

switch (process.env.NODE_ENV) {
    case "test":
        config = ConfigTest;
        break;
    default:
        config = ConfigDefault;
        break;
}

export default config;
