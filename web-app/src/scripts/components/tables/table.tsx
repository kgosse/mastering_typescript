import * as React from "react";

interface TableProps extends React.Props<any> {
    headerColumns: JSX.Element[];
    emptyContent: JSX.Element;
}

export class Table extends React.Component<TableProps, void> {
    constructor(props: TableProps) {
      super(props);
    }

    render() {
        return this.isEmpty() ? this.getEmptyContent() : this.getContent();
    }

    private getContent() {
        return (
            <table className="pure-table">
                <thead>
                    {this.props.headerColumns}
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }

    private getEmptyContent() {
        return (
            <table className="pure-table">
                <tbody>
                    <td>
                        {this.props.emptyContent}
                    </td>
                </tbody>
            </table>
        );
    }

    private isEmpty() {
        return this.props.children instanceof Array && (this.props.children as Array<JSX.Element>).length === 0;
    }
}
