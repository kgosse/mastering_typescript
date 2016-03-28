import * as React from "react";
import {BaseButtonProps} from "./base-button-props";

const BUTTON_CLASS_NAMES = {
    ALL: "pure-button",
    DISABLED: "pure-button-disabled",
    ACTIVE: "pure-button-active"
};

interface ButtonState {
    active: boolean;
}

export abstract class BaseButton extends React.Component<BaseButtonProps, ButtonState> {
    constructor(props: BaseButtonProps, private config: { buttonType: string; className?: string }) {
        super(props);
        this.state = { active: false };
    }

    render() {
        return (
            <button
                type={this.config.buttonType}
                className={this.getClassName()}
                onClick={(e) => this.handleClick(e)}
                disabled={this.props.isDisabled}
                onMouseDown={() => this.handleMouseDown()}>
                    {this.props.text}
            </button>
        );
    }

    private handleWindowMouseUp = () => {
        this.setState({ active: false });
        window.removeEventListener("mouseup", this.handleWindowMouseUp);
    };

    private handleClick(e: React.MouseEvent) {
        e.stopPropagation();

        if (!this.props.isDisabled && this.props.onClick != null) {
            this.props.onClick();
        }
    }

    private handleMouseDown() {
        this.setState({ active: true });
        window.addEventListener("mouseup", this.handleWindowMouseUp);
    }

    private getClassName() {
        let className = BUTTON_CLASS_NAMES.ALL + " " + (this.config.className || "") + " " + (this.props.className || "");

        if (this.props.isDisabled) {
            className += " " + BUTTON_CLASS_NAMES.DISABLED;
        }

        if (this.state.active === true) {
            className += " " + BUTTON_CLASS_NAMES.ACTIVE;
        }

        return className;
    }
}
