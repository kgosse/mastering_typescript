import * as React from "react";
import {SelectInputOption} from "./select-input-option";
import {BaseInputProps} from "./base";

interface SelectInputProps extends BaseInputProps<string> {
    options: SelectInputOption[];
    includeBlank?: boolean;
}

export class SelectInput extends React.Component<SelectInputProps, void> {
    constructor(props: SelectInputProps) {
        super(props);
    }

    render() {
        return (
            <select
                id={this.props.id}
                className={this.props.className}
                disabled={this.props.isDisabled}
                placeholder={this.props.placeholder}
                value={this.props.value || ""}
                onChange={(e) => this.onChange((e.target as HTMLInputElement).value)}>
                {this.getOptionElements(this.props.options, this.props.includeBlank)}
            </select>
        );
    }

    private onChange(value: string) {
        if (this.props.onChange != null) {
            if (value.length === 0) {
                value = null;
            }

            this.props.onChange(value);
        }
    }

    private getOptionElements(options: SelectInputOption[], includeBlank: boolean) {
        const optionElements = options.map((option) => {
            return (
                <option value={option.value} key={option.value}>{option.text}</option>
            );
        });

        if (includeBlank === true) {
            optionElements.splice(0, 0, (
                <option value="" key="-1"></option>
            ));
        }

        return optionElements;
    }
}
