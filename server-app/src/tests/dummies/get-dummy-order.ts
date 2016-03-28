import {Order, OrderPriority, OrderStatus} from "./../../models";

export function getDummyOrder(): Order {
    return {
        orderID: undefined,
        name: "Mr. Frank",
        city: "Toronto",
        receivedDate: new Date(),
        address1: "232 Shuter Street",
        address2: undefined,
        foodItems: [],
        priority: OrderPriority.Low,
        status: OrderStatus.Enroute
    };
}
