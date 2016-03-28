import * as React from "react";

export interface PageHeaderProps extends React.Props<any> {
    title: string;
    rightSideContent?: JSX.Element;
}

export class PageHeader extends React.Component<PageHeaderProps, void> {
    render() {
        return (
            <div className="header">
                <div className="pure-g">
                    <div className="pure-u-2-3">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="pure-u-1-3 page-header-right">
                        {this.props.rightSideContent}
                    </div>
                </div>
            </div>
        );
    }
}
