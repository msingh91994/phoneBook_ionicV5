// for ionic storage only not in use in this project

import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

@Injectable()
export class Data {

    private list: any;

    constructor(public storage: Storage) { }

    getData(key) {
        return this.storage.get(key);
    }

    saveData(key, data) {
        this.storage.set(key, data)
    }

    clearData() {
        this.storage.clear();
    }

    get getter(): any {
        return this.list;
    }
    set setter(val: any) {
        this.list = val;
    }
}