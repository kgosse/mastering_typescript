export interface ConfigStructure {
    SERVER: {
        DIR: string;
        PORT: number;
    };
    STORAGE: {
        DIR: string;
        FOOD_ITEMS_FILE: string;
        ORDERS_FILE: string;
    };
    LOG: {
        FILE: string;
    };
};
