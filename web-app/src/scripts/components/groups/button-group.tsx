import {BaseGroup} from "./base";

export class ButtonGroup extends BaseGroup {
    constructor(props: { children?: any }) {
        super(props, { className: "pure-controls" });
    }
}
