import {Order} from "./../server";

export class ShowOrderListAction {
}

export class ShowOrderEditAction {
    constructor(public order?: Order) {
    }
}

export class SaveOrderAction {
    constructor(public order: Order) {
    }
}

export class RemoveOrderAction {
    constructor(public orderID: string) {
    }
}
