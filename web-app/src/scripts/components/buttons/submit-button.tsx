import {BaseButton, BaseButtonProps} from "./base";

export class SubmitButton extends BaseButton {
    constructor(props: BaseButtonProps) {
        super(props, { buttonType: "submit", className: "pure-button-primary" });
    }
}
