import {BaseButton, BaseButtonProps} from "./base";

export class Button extends BaseButton {
    constructor(props: BaseButtonProps) {
        super(props, { buttonType: "button" });
    }
}
