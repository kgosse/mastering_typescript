import {SelectInputOption} from "./../components";
import {EnumHelper} from "./enum-helper";

export class SelectHelper {
    static enumToOptions(e: any, valueToStringFunction: (val: number) => string): SelectInputOption[] {
        return EnumHelper.getValues(e).map((val) => {
            return {
                text: valueToStringFunction(val),
                value: val.toString()
            };
        });
    }
}
