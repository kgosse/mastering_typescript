import {OrderPriority} from "./../server";

export function getOrderPriorityString(orderPriority: OrderPriority) {
    switch (orderPriority) {
        case null:
            return "";
        case OrderPriority.Low:
            return "Low";
        case OrderPriority.Medium:
            return "Medium";
        case OrderPriority.High:
            return "High";
        default:
            throw new Error(`Not implemented value: ${orderPriority}`);
    }
}
