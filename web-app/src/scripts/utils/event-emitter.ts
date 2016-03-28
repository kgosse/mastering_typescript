export class EventEmitter<T> {
    private events: Array<T> = [];

    constructor(private eventExecutionContext?: any) {
    }

    on(event: T) {
        if (this.events.indexOf(event) === -1) {
            this.events.push(event);
        }
    }

    off(event: T) {
        let index = this.events.indexOf(event);

        if (index >= 0) {
            this.events.splice(index, 1);
        }
    }

    emit(...args: any[]) {
        this.events.forEach((item) => {
            if ((item as any as Function).apply(this.eventExecutionContext, args) === false) {
                return;
            }
        });
    }
}
