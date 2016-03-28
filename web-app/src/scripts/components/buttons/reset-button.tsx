import {BaseButton, BaseButtonProps} from "./base";

export class ResetButton extends BaseButton {
    constructor(props: BaseButtonProps) {
        super(props, { buttonType: "reset", className: "button-reset" });
    }
}
