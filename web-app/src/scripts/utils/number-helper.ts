export class NumberHelper {
    static formatAsCurrency(val: number, options: { prefix?: string; } = {}) {
        let {prefix = "$"} = options;

        return (val == null) ? "" : prefix + val.toFixed(2);
    }

    static parseString(val: string) {
        return NumberHelper.isNumber(val) ? parseFloat(val) : null;
    }

    static toString(val: number | string) {
        if (typeof val === "number") {
            return val.toString();
        }
        else {
            return NumberHelper.isNumber(val) ? val : null;
        }
    }

    static isNumber(val: string) {
        return !isNaN(parseInt(val, 10));
    }
}
