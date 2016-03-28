import {OrderStatus} from "./../server";

export function getOrderStatusString(orderStatus: OrderStatus) {
    switch (orderStatus) {
        case null:
            return "";
        case OrderStatus.Pending:
            return "Pending";
        case OrderStatus.Received:
            return "Received";
        case OrderStatus.Enroute:
            return "Enroute";
        case OrderStatus.Delivered:
            return "Delivered";
        case OrderStatus.Canceled:
            return "Canceled";
        default:
            throw new Error(`Not implemented value: ${orderStatus}`);
    }
}
