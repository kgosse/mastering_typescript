/// <reference path="../../typings/nedb/nedb.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import * as path from "path";
import Datastore = require("nedb");

export class DatabaseWrapper<T> {
    constructor(private db: Datastore, private primaryKeyPropertyName: string) {
        // todo: mark constructor as private once typescript supports private constructors
    }

    static getInstance<T>(options: { dir: string, fileName: string, primaryKeyPropertyName: string }) {
        return new Promise<DatabaseWrapper<T>>((resolve, reject) => {
            const db = new Datastore({ filename: DatabaseWrapper.getDatabaseFileName(options.dir, options.fileName) });

            db.loadDatabase((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(new DatabaseWrapper<T>(db, options.primaryKeyPropertyName));
                }
            });
        });
    }

    private static getDatabaseFileName(dir: string, fileName: string) {
        return path.join(dir, fileName + ".db");
    }

    list() {
        return new Promise<T[]>((resolve, reject) => {
            this.db.find<T>({}, (err, items) => {
                items.forEach((item) => {
                    this.fillItemWithExternalPrimaryKey(item);
                });

                err ? reject(err) : resolve(items);
            });
        });
    }

    insertUpdate(item: T) {
        return new Promise<T>((resolve, reject) => {
            let query = this.getQueryFromItem(item);

            this.fillItemWithInternalPrimaryKey(item);

            this.db.update(query, item, { multi: false, upsert: true }, (err) => {
                this.fillItemWithExternalPrimaryKey(item);
                err ? reject(err) : resolve(item);
            });
        });
    }

    remove(primaryKey: string): Promise<number> {
        let query = this.getPrimaryKeyQuery(primaryKey);

        return new Promise<number>((resolve, reject) => {
            this.db.remove(query, (err, numberRemoved) => {
                err ? reject(err) : resolve(numberRemoved);
            });
        });
    }

    private fillItemWithExternalPrimaryKey(dbItem: T) {
        // it's easier to use the any type here. It's constrained to within this method and its exposure is limited
        const item: any = dbItem;
        // nedb puts the primary key on the object as _id
        if (item != null && this.primaryKeyPropertyName != null && item._id != null) {
            item[this.primaryKeyPropertyName] = item._id;
            delete item._id;
        }
    }

    private fillItemWithInternalPrimaryKey(dbItem: T) {
        const item: any = dbItem;
        if (item != null && this.primaryKeyPropertyName != null && item[this.primaryKeyPropertyName] != null) {
            item._id = item[this.primaryKeyPropertyName];
            delete item[this.primaryKeyPropertyName];
        }
    }

    private getQueryFromItem(item: T) {
        return { _id: (item as any)[this.primaryKeyPropertyName] };
    }

    private getPrimaryKeyQuery(primaryKey: string) {
        return { _id: primaryKey };
    }
}
