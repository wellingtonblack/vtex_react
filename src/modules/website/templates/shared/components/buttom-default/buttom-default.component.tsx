import * as React from "react";
import { ButtonCartProp } from "./buttom-cart.model";
import "./buttom-default.component.scss";



export class ButtonCartComponent extends React.Component<ButtonCartProp, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <a className="btn  btn whiteColor" href={this.props.link}>
                {this.props.children}
            </a>
        );
    }
}


