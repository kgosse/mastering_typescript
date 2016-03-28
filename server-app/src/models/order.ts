import {OrderStatus, OrderPriority} from "./enums";
import {FoodItem} from "./food-item";

export interface Order {
    orderID: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    status: OrderStatus;
    priority: OrderPriority;
    receivedDate: Date;
    foodItems: FoodItem[];
}
