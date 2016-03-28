import * as React from "react";

export interface BaseButtonProps extends React.Props<any> {
    text: String;
    isDisabled?: boolean;
    onClick?: () => void;
    className?: string;
}
