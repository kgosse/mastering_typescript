import * as React from "react";
import {AppDispatcher} from "./../../app-dispatcher";
import {ShowFoodItemListAction, ShowFoodItemEditAction, ShowOrderListAction, ShowOrderEditAction, ShowAboutAction} from "./../../actions";

interface SidebarState {
    currentAction: any;
}

export class Sidebar extends React.Component<React.Props<void>, SidebarState> {
    constructor() {
        super();

        this.state = {
            currentAction: null
        };
    }

    render() {
        return (
            <div id="sidebar">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Slice-it Pizza</a>

                    <ul className="pure-menu-list">
                        <li className={this.getClassName(ShowFoodItemListAction, ShowFoodItemEditAction)}>
                            <a href="javascript:void" onClick={() => this.navigateToFoodItemsList()} className="pure-menu-link">
                                Food Items
                            </a>
                        </li>
                        <li className={this.getClassName(ShowOrderListAction, ShowOrderEditAction)}>
                            <a href="javascript:void" onClick={() => this.navigateToOrdersList()} className="pure-menu-link">
                                Orders
                            </a>
                        </li>
                        <li className={this.getClassName(ShowAboutAction)}>
                            <a href="javascript:void" onClick={() => this.navigateToAbout()} className="pure-menu-link">
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        AppDispatcher.register(ShowFoodItemListAction, (action) => this.setState({ currentAction: action }));
        AppDispatcher.register(ShowFoodItemEditAction, (action) => this.setState({ currentAction: action }));
        AppDispatcher.register(ShowOrderListAction, (action) => this.setState({ currentAction: action }));
        AppDispatcher.register(ShowOrderEditAction, (action) => this.setState({ currentAction: action }));
        AppDispatcher.register(ShowAboutAction, (action) => this.setState({ currentAction: action }));
    }

    private navigateToOrdersList() {
        AppDispatcher.dispatch(new ShowOrderListAction());
    }

    private navigateToFoodItemsList() {
        AppDispatcher.dispatch(new ShowFoodItemListAction());
    }

    private navigateToAbout() {
        AppDispatcher.dispatch(new ShowAboutAction());
    }

    private getClassName(...selectedActions: { new(...args: any[]): any }[]) {
        let isSelected = false;

        selectedActions.forEach((action) => {
            isSelected = isSelected || this.state.currentAction instanceof action;
        });

        return "pure-menu-item" + (isSelected ? " pure-menu-selected" : "");
    }
}
