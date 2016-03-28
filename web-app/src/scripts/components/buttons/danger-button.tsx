import {BaseButton, BaseButtonProps} from "./base";

export class DangerButton extends BaseButton {
    constructor(props: BaseButtonProps) {
        super(props, { buttonType: "button", className: "button-danger" });
    }
}
