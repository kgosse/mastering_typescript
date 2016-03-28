import * as React from "react";
import {AppDispatcher} from "./../../app-dispatcher";
import {ShowOrderListAction, SaveOrderAction} from "./../../actions";
import {SubmitButton, CancelButton, DangerButton, TextInput, SelectInput, ControlForm,
    ControlGroup, PageHeader, PageContent} from "./../../components";
import {FoodItemStore} from "./../../stores";
import {Order, OrderStatus, OrderPriority, FoodItem} from "./../../server";
import {NumberHelper, SelectHelper} from "./../../utils";
import {getOrderPriorityString, getOrderStatusString} from "./../../resources";

interface OrderEditProps extends React.Props<any> {
    defaultOrder?: Order;
}

interface OrderEditState extends Order {
    addFoodItemID: string;
}

export class OrderEdit extends React.Component<OrderEditProps, OrderEditState> {
    constructor(props: OrderEditProps) {
        super(props);
        this.state = {
            orderID: null,
            name: null,
            address1: null,
            address2: null,
            city: null,
            status: null,
            priority: null,
            receivedDate: new Date(),
            foodItems: [],
            addFoodItemID: null
        };

        Object.assign(this.state, props.defaultOrder);
    }

    render() {
        return (
            <div>
                <PageHeader title={this.isEditing() ? "Orders - Edit" : "Orders - Add"} />
                <PageContent>
                    <ControlForm onSubmit={() => this.onSubmit()}>
                        <h2>Details</h2>
                        <ControlGroup>
                            <label htmlFor="name">Name</label>
                            <TextInput
                                id="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={(name) => this.handleChange("name", name)} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="address1">Address</label>
                            <TextInput
                                id="address1"
                                placeholder="Address 1"
                                value={this.state.address1}
                                onChange={(address1) => this.handleChange("address1", address1)} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="address2"></label>
                            <TextInput
                                id="address2"
                                placeholder="Address 2"
                                value={this.state.address2}
                                onChange={(address2) => this.handleChange("address2", address2)} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="city">City</label>
                            <TextInput
                                id="city"
                                placeholder="Name"
                                value={this.state.city} onChange={(city) => this.handleChange("city", city)} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="status">Status</label>
                            <SelectInput
                                id="status"
                                placeholder="Status"
                                includeBlank={true}
                                value={NumberHelper.toString(this.state.status)}
                                options={SelectHelper.enumToOptions(OrderStatus, getOrderStatusString)}
                                onChange={(status) => this.handleChange("status", NumberHelper.parseString(status))} />
                        </ControlGroup>
                        <ControlGroup>
                            <label htmlFor="priority">Priority</label>
                            <SelectInput
                                id="priority"
                                placeholder="Priority"
                                includeBlank={true}
                                value={NumberHelper.toString(this.state.priority)}
                                options={SelectHelper.enumToOptions(OrderPriority, getOrderPriorityString)}
                                onChange={(priority) => this.handleChange("priority", NumberHelper.parseString(priority))} />
                        </ControlGroup>
                        <h2>Food Items</h2>
                        <div className="row">
                            {this.addFoodItemRender()}
                        </div>
                        <div className={"row empty-food-items " + (this.state.foodItems.length > 0 ? "hidden" : "")}>
                            No items.
                        </div>
                        {this.state.foodItems.map((foodItem, index) => this.foodItemRender(foodItem, index))}
                        <div className="row total-price-row text-right">
                            <strong className="total-price">
                                {NumberHelper.formatAsCurrency(this.state.foodItems.map(f => f.price).reduce((a, b) => a + b, 0))}
                            </strong>
                        </div>
                        <div className="row inline-elements">
                            <SubmitButton text={this.isEditing() ? "Save" : "Add"} />
                            <CancelButton text="Cancel" onClick={() => this.goBack()} />
                        </div>
                    </ControlForm>
                </PageContent>
            </div>
        );
    }

    private foodItemRender(foodItem: FoodItem, index: number) {
        return (
            <div key={index} className="row">
                <div className="pure-u-1-2">{foodItem.name}</div>
                <div className="pure-u-1-2 text-right inline-elements">
                    <span>{NumberHelper.formatAsCurrency(foodItem.price)}</span>
                    <DangerButton text="Remove" onClick={() => this.removeFoodItem(index)} />
                </div>
            </div>
        );
    }

    private addFoodItemRender() {
        const onChange = () => {
            this.addFoodItem(FoodItemStore.get(this.state.addFoodItemID));
            this.setState({
                addFoodItemID: null
            } as OrderEditState);
        };
        const options = FoodItemStore.getForSelect();

        if (options.length === 0) {
            return (
                <div className="inline-elements text-warning">
                    There are no active food items. You must create an active food item in order to be able to add one to an order.
                </div>
            );
        }
        else {
            return (
                <div className="inline-elements">
                    <SelectInput
                        id="addFoodItemSelect"
                        placeholder="Food Item"
                        includeBlank={true}
                        value={this.state.addFoodItemID}
                        options={options}
                        onChange={(addFoodItemID) => this.handleChange("addFoodItemID", addFoodItemID)} />
                    <DangerButton text="Add" isDisabled={this.state.addFoodItemID == null} onClick={onChange} />
                </div>
            );
        }
    }

    private addFoodItem(foodItem: FoodItem) {
        const foodItems = this.state.foodItems.slice();
        foodItems.push(foodItem);
        this.updateFoodItems(foodItems);
    }

    private removeFoodItem(index: number) {
        const foodItems = this.state.foodItems.slice();
        foodItems.splice(index, 1);
        this.updateFoodItems(foodItems);
    }

    private updateFoodItems(foodItems: FoodItem[]) {
        this.setState({
            foodItems: foodItems
        } as OrderEditState);
    }

    private isEditing() {
        return this.state.orderID != null;
    }

    private onSubmit() {
        AppDispatcher.dispatch(new SaveOrderAction(this.getOrderFromState()));
        this.goBack();
    }

    private goBack() {
        AppDispatcher.dispatch(new ShowOrderListAction());
    }

    private getOrderFromState(): Order {
        return {
            orderID: this.state.orderID,
            name: this.state.name,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            status: this.state.status,
            priority: this.state.priority,
            receivedDate: this.state.receivedDate,
            foodItems: this.state.foodItems
        };
    }

    private handleChange(propName: string, val: any) {
        const obj: { [propName: string]: any} = {};
        obj[propName] = val;
        this.setState(obj as OrderEditState);
    }
}
