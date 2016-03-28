import {ServerFoodItems, ServerOrders} from "./server";
import CONFIG from "./config/config";

export class ServerFactory {
    private static serverFoodItems: ServerFoodItems;
    private static serverOrders: ServerOrders;

    static getServerFoodItems() {
        return ServerFactory.serverFoodItems || (ServerFactory.serverFoodItems = new ServerFoodItems({ urlPrefix: CONFIG.SERVER_URL }));
    }

    static getServerOrders() {
        return ServerFactory.serverOrders || (ServerFactory.serverOrders = new ServerOrders({ urlPrefix: CONFIG.SERVER_URL }));
    }
}
