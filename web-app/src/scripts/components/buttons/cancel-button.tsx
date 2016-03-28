import {BaseButton, BaseButtonProps} from "./base";

export class CancelButton extends BaseButton {
    constructor(props: BaseButtonProps) {
        super(props, { buttonType: "button", className: "button-cancel" });
    }
}
