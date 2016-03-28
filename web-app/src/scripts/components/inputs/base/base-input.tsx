import * as React from "react";
import {BaseInputProps} from "./base-input-props";

export interface BaseInputState {
    isFocused: boolean;
    value: string;
}

export abstract class BaseInput<T extends string | number> extends React.Component<BaseInputProps<T>, BaseInputState> {
    private static INPUT_REF = "input";

    constructor(props: BaseInputProps<T>, private config: { inputType: string; step?: number; }) {
        super(props);

        this.state = {
            isFocused: false,
            value: this.valueToString(props.value)
        };
    }

    protected abstract valueToString(value: string | number): string;
    protected abstract valueToType(value: string): T;

    componentWillReceiveProps(props: BaseInputProps<T>) {
        this.setState({
            value: this.valueToString(props.value)
        } as BaseInputState);
    }

    componentDidMount() {
        this.setState({
            isFocused: document.activeElement === React.findDOMNode(this.refs[BaseInput.INPUT_REF])
        } as BaseInputState);
    }

    render() {
        return (
            <input
                id={this.props.id}
                className={this.props.className}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                ref={BaseInput.INPUT_REF}
                step={this.config.step}
                type={this.config.inputType}
                value={this.state.value}
                onChange={(e) => this.onChange((e.target as HTMLInputElement).value)}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()} />
        );
    }

    private onChange(val: string) {
        this.setState({
            value: val
        } as BaseInputState);
    }

    private onFocus() {
        this.setState({
            isFocused: true
        } as BaseInputState);
    }

    private onBlur() {
        this.setState({
            isFocused: false
        } as BaseInputState);

        this.notifyParentOfValueChange(this.state.value);
    }

    private notifyParentOfValueChange(val: string) {
        if (this.props.onChange != null) {
            this.props.onChange(this.valueToType(this.state.value));
        }
    }
}
