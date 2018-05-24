import * as React from "react";
import "./quantity-selector.component.scss";

export interface QuantitySelectorProps {
    inital?: number;
    max: number;
    handleAddQuantity(quantity: number): void;
    handleRemoveQuantity(quantity: number): void;
    handleRemoveCart?(): void;
}

export interface QuantitySelectorState {
    quantity: number;
}

export class QuantitySelectorComponent extends React.Component<QuantitySelectorProps, QuantitySelectorState> {

    constructor(props: QuantitySelectorProps) {
        super(props);
        this.state = {
            quantity: this.props.inital || 1,
        };

        window.addEventListener("quantity.update", (e) => {
            this.setState({
                quantity: this.props.inital || 1,
            });
        });
    }

    public render() {
        return (
            <div className="quantity-selector-component">
                {this.props.children ? (
                    <span className="text-quantity">{this.props.children}</span>
                ) : ""}
                <div className="wrapper-quantity">
                    <span onClick={() => {
                        if ((this.state.quantity - 1) >= 1) {
                            this.setState({
                                quantity: this.state.quantity - 1,
                            }, () => {
                                this.props.handleRemoveQuantity(this.state.quantity);
                            });
                        } else {
                            this.props.handleRemoveCart();
                        }
                    }}>-</span>
                    <input type="text" value={this.state.quantity} onChange={(e) => {
                        if (e.target.value && e.target.value.match(/\d+/).length > 0 && parseInt(e.target.value.match(/\d+/).join("")) <= this.props.max) {
                            const prev = this.state.quantity;
                            this.setState({ quantity: parseInt(e.target.value.match(/\d+/).join("")) }, () => {
                                if (this.state.quantity > prev) {
                                    this.props.handleAddQuantity(this.state.quantity);
                                } else {
                                    this.props.handleRemoveQuantity(this.state.quantity);
                                }
                            });
                        }
                    }} />
                    <span onClick={() => {
                        this.setState({
                            quantity: this.state.quantity <= this.props.max ? this.state.quantity + 1 : this.state.quantity,
                        }, () => {
                            this.props.handleAddQuantity(this.state.quantity);
                        });
                    }}>+</span>
                </div>
            </div>
        );
    }
}
