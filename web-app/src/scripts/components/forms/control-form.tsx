import {BaseFormProps, BaseForm} from "./base";

export class ControlForm extends BaseForm {
    constructor(props: BaseFormProps) {
      super(props, { className: "pure-form-stacked" });
    }
}
