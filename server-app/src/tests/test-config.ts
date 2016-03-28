import * as path from "path";

const currentDir = path.resolve(__dirname);

const CONFIG = {
    STORAGE: {
        DIR: path.join(currentDir, "temp"),
        SETTINGS_FILE: "settings",
        FOOD_ITEMS_FILE: "food-items",
        ORDERS_FILE: "orders"
    }
};

export default CONFIG;
