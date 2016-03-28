import {DatabaseWrapper} from "./../utils";
import {Order} from "./../models";

export class OrderStorage {
    constructor(private orderDB: DatabaseWrapper<Order>) {
    }

    list() {
        return this.orderDB.list();
    }

    insertUpdate(order: Order) {
        return this.orderDB.insertUpdate(order);
    }

    remove(orderID: string) {
        return this.orderDB.remove(orderID);
    }
}
