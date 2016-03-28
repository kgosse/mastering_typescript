import * as React from "react";
import {BaseFormProps} from "./base-form-props";

export abstract class BaseForm extends React.Component<BaseFormProps, void> {
    constructor(props: BaseFormProps, private config: { className: string }) {
      super(props);
    }

    render() {
        return (
            <form className={this.getClassName()} onSubmit={(e) => this.onSubmit(e)}>
                <fieldset>
                    {this.props.children}
                </fieldset>
            </form>
        );
    }

    private onSubmit(e: React.FormEvent) {
        if (this.props.onSubmit != null) {
            e.preventDefault();
            this.props.onSubmit();
        }
    }

    private getClassName() {
        return "pure-form " + this.config.className;
    }
}
