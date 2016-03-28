import * as React from "react";

export abstract class BaseGroup extends React.Component<{ children?: any }, void> {
    constructor(props: any, private config: { className: string }) {
        super(props);
    }

    render() {
        return (
            <div className={this.config.className}>
                {this.props.children}
            </div>
        );
    }
}
