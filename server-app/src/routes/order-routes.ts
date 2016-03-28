/// <reference path="../../node_modules/server-bridge/server-bridge.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import {MainFactory} from "./../main-factory";
import {Order} from "./../models";
import {Use, Get, Post, Routes} from "server-bridge";

@Use("/orders")
export class OrderRoutes extends Routes {
    @Get("/list")
    list() {
        return MainFactory.createStorageFactory().createOrderStorage().then((orderStorage) => {
            return orderStorage.list();
        });
    }

    @Post("/remove")
    remove(opts: { orderID: string }) {
        return MainFactory.createStorageFactory().createOrderStorage().then((orderStorage) => {
            return orderStorage.remove(opts.orderID);
        });
    }

    @Post("/")
    set(order: Order) {
        return MainFactory.createStorageFactory().createOrderStorage().then((orderStorage) => {
            return orderStorage.insertUpdate(order);
        });
    }
}
