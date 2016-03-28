import * as React from "react";
import {AppDispatcher} from "./../../app-dispatcher";
import {ShowFoodItemEditAction, RemoveFoodItemAction} from "./../../actions";
import {DangerButton, Button, Table, PageHeader, PageContent} from "./../../components";
import {FoodItem} from "./../../server";
import {FoodItemStore} from "./../../stores";
import {NumberHelper} from "./../../utils";
import {getFoodItemStatusString} from "./../../resources";

interface FoodItemListProps extends React.Props<any> {
}

interface FoodItemListState {
    allFoodItems: FoodItem[];
}

export class FoodItemList extends React.Component<FoodItemListProps, FoodItemListState> {
    constructor(props: FoodItemListProps) {
        super(props);
        this.state = this.getFoodItemsState();
    }

    componentDidMount() {
        FoodItemStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        FoodItemStore.removeChangeListener(this.onChange);
    }

    render() {
        const rows: JSX.Element[] = this.state.allFoodItems.map(foodItem => this.getRowElement(foodItem));

        return (
            <div>
                <PageHeader title="Food Items" rightSideContent={this.getHeaderRightSideContent()} />
                <PageContent>
                    <Table headerColumns={this.getTableHeaderColumns()} emptyContent={this.getTableEmptyContent()}>
                        {rows}
                    </Table>
                </PageContent>
            </div>
        );
    }

    private onChange = () => {
        this.setState(this.getFoodItemsState());
    };

    private getHeaderRightSideContent() {
        return (
            <Button text="Add" onClick={() => AppDispatcher.dispatch(new ShowFoodItemEditAction())} />
        );
    }

    private getTableHeaderColumns() {
        return [
            (<th key="header-name">Name</th>),
            (<th key="header-price">Price</th>),
            (<th key="header-status">Status</th>),
            (<th key="header-actions"></th>)
        ];
    }

    private getTableEmptyContent() {
        return (
            <div>No food items</div>
        );
    }

    private getRowElement(foodItem: FoodItem) {
        return (
            <tr key={foodItem.foodItemID}>
                <td>
                    {foodItem.name}
                </td>
                <td>
                    {NumberHelper.formatAsCurrency(foodItem.price)}
                </td>
                <td>
                    {getFoodItemStatusString(foodItem.status)}
                </td>
                <td className="inline-elements">
                    <Button text="Edit" onClick={() => this.editFoodItem(foodItem.foodItemID)} />
                    <DangerButton text="Delete" onClick={() => this.delete(foodItem.foodItemID)} />
                </td>
            </tr>
        );
    }

    private editFoodItem(foodItemID: string) {
        AppDispatcher.dispatch(new ShowFoodItemEditAction(FoodItemStore.get(foodItemID)));
    }

    private delete(foodItemID: string) {
        AppDispatcher.dispatch(new RemoveFoodItemAction(foodItemID));
    }

    private getFoodItemsState(): FoodItemListState {
        return {
            allFoodItems: FoodItemStore.getAll().sort((a, b) => a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0)
        };
    }
}
