import {BaseInput, BaseInputProps} from "./base";

export class TextInput extends BaseInput<string> {
    constructor(props: BaseInputProps<string>) {
        super(props, { inputType: "text" });
    }

    protected valueToString(val: string | number) {
        return val as string; // it will always be a string for text-inputs
    }

    protected valueToType(val: string) {
        return val; // no transformation necessary
    }
}
