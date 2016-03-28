import * as React from "react";

export interface PageContentProps extends React.Props<any> {
}

export class PageContent extends React.Component<PageContentProps, void> {
    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        );
    }
}
