import * as React from "react";

export interface BaseFormProps extends React.Props<any> {
    onSubmit?: () => void;
}
