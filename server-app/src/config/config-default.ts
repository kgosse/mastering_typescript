import * as path from "path";
import {ConfigStructure} from "./structure/config-structure";

const currentDir = path.resolve(__dirname);

const CONFIG: ConfigStructure = {
    SERVER: {
        DIR: "/",
        PORT: process.env.PORT || 8082
    },
    STORAGE: {
        DIR: path.join(currentDir, "../storage/data"),
        FOOD_ITEMS_FILE: "food-items",
        ORDERS_FILE: "orders"
    },
    LOG: {
        FILE: path.join(currentDir, "../log/log.txt")
    }
};

export default CONFIG;
