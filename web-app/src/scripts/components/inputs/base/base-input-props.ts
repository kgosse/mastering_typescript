import * as React from "react";

export interface BaseInputProps<T extends number | string> extends React.Props<any> {
    id: string;
    isDisabled?: boolean;
    placeholder?: string;
    value?: T;
    onChange?: (val: T) => void;
    className?: string;
}
