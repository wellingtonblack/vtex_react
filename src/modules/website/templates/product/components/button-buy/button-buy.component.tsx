import * as React from "react";
import "./button-buy.component.scss";

export interface ButtonBuyProps {
    handleBuy(): void;
}

export interface ButtonBuyState {
    
}

export class ButtonBuyComponent extends React.Component<ButtonBuyProps, ButtonBuyState> {

    constructor(props: ButtonBuyProps) {
        super(props);
    }

    public render() {


        return (
            <div className="button-buy-component">
                <button onClick={() => { this.props.handleBuy(); }}>comprar</button>
            </div>
        );
    }
}
