import {ConfigStructure} from "./structure/config-structure";
import ConfigDefault from "./config-default";

let CONFIG: ConfigStructure;

// currently only one configuration. See the server-app which shows multiple configurations.
switch (process.env.NODE_ENV) {
    default:
        CONFIG = ConfigDefault;
        break;
}

export default CONFIG;
