import * as React from "react";
// tslint:disable-next-line:no-var-requires
import "./cart-bar.component.scss";
import { OderformModel } from "../../../../models/orderform.model";

export interface CartProps {
    orderForm: OderformModel;
}
export class CartBarComponent extends React.Component<CartProps, {}> {
    
    constructor(props: CartProps) {
        super(props);
    }

    public render() {
        return (
            <div 
                onClick={() => { window.dispatchEvent(new CustomEvent("minicart.state", { detail: true })); }} 
                className="cart-bar-component"> 
                <svg  viewBox="0 0 20 20" className="icon-header"><path d="M18.07,17.77H1.71L3,6.54h13.8Zm-15.24-1H17l-1-9.23h-12Z"/><path className="cls-1" d="M13.55,8.1h-1V6.61a2.69,2.69,0,0,0-5.38,0V8.1h-1V6.61a3.69,3.69,0,0,1,7.38,0Z"/></svg>
                {(this.props.orderForm) ? <span className="count">{this.props.orderForm.items.length}</span> : ""}
            </div>   
        );
    }
}