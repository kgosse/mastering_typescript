import {EventEmitter} from "./../../utils";

export abstract class BaseStore {
    private static changeEventEmitter = new EventEmitter<() => void>();

    static emitChange() {
        this.changeEventEmitter.emit();
    }

    static addChangeListener(callback: () => void) {
        this.changeEventEmitter.on(callback);
    }

    static removeChangeListener(callback: () => void) {
        this.changeEventEmitter.off(callback);
    }
}
