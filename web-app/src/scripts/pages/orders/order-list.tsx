import * as React from "react";
import {AppDispatcher} from "./../../app-dispatcher";
import {ShowOrderEditAction, RemoveOrderAction} from "./../../actions";
import {DangerButton, Button, PageHeader, PageContent, Table} from "./../../components";
import {OrderStore} from "./../../stores";
import {Order} from "./../../server";
import {NumberHelper, DateHelper, StringHelper} from "./../../utils";
import {getOrderStatusString, getOrderPriorityString} from "./../../resources";

interface OrderListProps extends React.Props<any> {
}

interface OrderListState {
    allOrders: Order[];
}

export class OrderList extends React.Component<OrderListProps, OrderListState> {
    constructor(props: OrderListProps) {
        super(props);
        this.state = this.getOrdersState();
    }

    componentDidMount() {
        OrderStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener(this.onChange);
    }

    render() {
        const rows = this.state.allOrders.map(o => this.getRowElement(o));

        return (
            <div>
                <PageHeader title="Orders" rightSideContent={this.getHeaderRightSideContent()} />
                <PageContent>
                    <Table headerColumns={this.getTableHeaderColumns()} emptyContent={this.getTableEmptyContent()}>
                        {rows}
                    </Table>
                </PageContent>
            </div>
        );
    }

    private onChange = () => {
        this.setState(this.getOrdersState());
    };

    private getHeaderRightSideContent() {
        return (
            <Button text="Add" onClick={() => AppDispatcher.dispatch(new ShowOrderEditAction())} />
        );
    }

    private getTableHeaderColumns() {
        return [
            (<th key="header-name">Name</th>),
            (<th key="header-address">Address</th>),
            (<th key="header-food-items">Items</th>),
            (<th key="header-details">Details</th>),
            (<th key="header-delete"></th>)
        ];
    }

    private getTableEmptyContent() {
        return (
            <div>No orders.</div>
        );
    }

    private getRowElement(order: Order) {
        return (
            <tr key={order.orderID}>
                <td>
                    {order.name}
                </td>
                <td>
                    <div>{order.address1}</div>
                    <div className={StringHelper.isNullOrWhitespace(order.address2) ? "hidden" : ""}>{order.address2}</div>
                    <div>{order.city}</div>
                </td>
                <td>
                    {order.foodItems.map(f =>
                        (<div>
                            {f.name + " - " + NumberHelper.formatAsCurrency(f.price)}
                        </div>)
                    )}
                </td>
                <td>
                    <div><b>Received:</b> {DateHelper.toLongDateString(order.receivedDate)}</div>
                    <div><b>Total:</b> {
                        NumberHelper.formatAsCurrency(order.foodItems.map(f => f.price).reduce((a, b) => a + b, 0))
                    }</div>
                    <div><b>Status:</b> {getOrderStatusString(order.status)}</div>
                    <div><b>Priority:</b> {getOrderPriorityString(order.priority)}</div>
                </td>
                <td className="inline-elements">
                    <Button text="Edit" onClick={() => this.edit(order.orderID)} />
                    <DangerButton text="Delete" onClick={() => this.delete(order.orderID)} />
                </td>
            </tr>
        );
    }

    private edit(orderID: string) {
        AppDispatcher.dispatch(new ShowOrderEditAction(OrderStore.get(orderID)));
    }

    private delete(orderID: string) {
        AppDispatcher.dispatch(new RemoveOrderAction(orderID));
    }

    private getOrdersState(): OrderListState {
        return {
            allOrders: OrderStore.getAll().sort((a, b) => a.receivedDate < b.receivedDate ? 1 : (a.receivedDate > b.receivedDate) ? -1 : 0)
        };
    }
}
