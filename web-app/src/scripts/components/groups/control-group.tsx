import {BaseGroup} from "./base";

export class ControlGroup extends BaseGroup {
    constructor(props: { children?: any }) {
        super(props, { className: "pure-control-group" });
    }
}
