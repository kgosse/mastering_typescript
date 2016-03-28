import {Dispatcher} from "flux";
const dispatcher = new Dispatcher();

export class AppDispatcher {
    static dispatch(dispatchObj: any) {
        dispatcher.dispatch(dispatchObj);
    }

    static register<T>(actionToRegister: { new(...args: any[]): T; }, callback: (payload: T) => void) {
        return dispatcher.register((action) => {
            if (action instanceof (actionToRegister as any)) {
                callback(action as any);
            }
        });
    }

    static unregister(id: string) {
        return dispatcher.unregister(id);
    }
}
