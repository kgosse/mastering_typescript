import * as React from "react";
import {PageHeader, PageContent} from "./../../components";

export class About extends React.Component<React.Props<any>, void> {
    render() {
        return (
            <div id="about">
                <PageHeader title="About" />
                <PageContent>
                    <p>
                        Slice-it Pizza is a simple sample application that shows off a TypeScript client / server
                        application.
                    </p>
                    <p>
                        It demonstrates a simple order management and tracking system that is managed
                        by an employee at the restaurant. An employee inputs food item details and order details.
                    </p>
                    <h2>Food Items</h2>
                    <p>
                        Food items are the various foods available at slice-it pizza.
                        For example: cheese pizza, salad, stromboli, etc.
                    </p>
                    <h2>Orders</h2>
                    <p>
                        Orders consist of details about the order such as the name of the person who ordered,
                        their address, the status, the priority, and the food items purchased.
                    </p>
                </PageContent>
            </div>
        );
    }
}
