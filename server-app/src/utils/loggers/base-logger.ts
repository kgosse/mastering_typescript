import * as express from "express";

export abstract class BaseLogger {
    abstract log(str: string): void;

    logRequest(req: express.Request) {
        this.log(`Request from ${req.ip} to ${req.originalUrl}`);
    }
}
