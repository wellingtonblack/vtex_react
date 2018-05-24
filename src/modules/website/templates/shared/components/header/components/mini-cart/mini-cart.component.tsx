import * as React from "react";
import "./mini-cart.component.scss";
import { OderformModel } from "../../../../models/orderform.model";
import { UtilsService } from "../../../../services/utils.service";
import { QuantitySelectorComponent } from "../../../quantity-selector/quantity-selector.component";

export interface MiniCartProps {
    handleUpdate(orderForm: OderformModel): void; 
}

export interface MiniCartState {
    orderForm: OderformModel;
    show: boolean;
}

declare const vtexjs: any;
export class MiniCartComponent extends React.Component<MiniCartProps, MiniCartState> {

    constructor(props: MiniCartProps) {
        super(props);

        this.state = {
            orderForm: null,
            show: false,
        };

        this.updateOrderForm = this.updateOrderForm.bind(this);
        this.updateOrderForm();

        window.addEventListener("minicart.update", (e) => {
            this.updateOrderForm();
        });

        window.addEventListener("minicart.state", (e: CustomEvent) => {
            this.setState({
                show: e.detail,
            });
        });
    }

    public updateOrderForm() {
        (window as any).loading(true);
        vtexjs.checkout.getOrderForm()
            .then((orderForm: OderformModel) => {
                (window as any).loading(false);
                this.setState({
                    orderForm,
                }, () => {
                    this.props.handleUpdate(this.state.orderForm);
                    window.dispatchEvent(new CustomEvent("quantity.update"));
                });
            }, () => {
                (window as any).loading(false);
            });
    }

    public closeCart() {
        this.setState({
            show: false,
        });
    }

    public render() {
        return (
            this.state.orderForm ? (
                <div className={`${(this.state.show === true) ? "active" : "inactive"} mini-cart-component`}>
                    <div className="close-navigation"><div className="button-close" onClick={this.closeCart.bind(this)}>X</div></div>
                    <div className="mini-cart-wrapper">
                        <section className="mini-cart-content">

                            {this.state.orderForm.items.length === 0 ? (
                                <header className="mini-cart-header">
                                    <h3>Seu carrinho está vazio</h3>
                                </header>
                            ) : ""}

                            <ul className="products">
                                {this.state.orderForm.items.map((item, index) => (
                                    <li className="product">
                                        <div className="product-image" style={{ backgroundImage: `url('${UtilsService.cropImage(300, 118, item.imageUrl)}')` }}>
                                        </div>
                                        <div className="product-name-quantity">
                                            <span className="product-name">
                                                {item.name}
                                            </span>
                                            <span className="product-price">
                                                R$ {UtilsService.formatePrice(((item.sellingPrice as any) * item.quantity), ",")}
                                            </span>
                                            <span className="product-quantity">
                                                <QuantitySelectorComponent
                                                    inital={item.quantity}
                                                    handleAddQuantity={(quantity) => {
                                                        (window as any).loading(true);
                                                        vtexjs.checkout.updateItems([{
                                                            index,
                                                            quantity,
                                                        }]).then(() => {
                                                            (window as any).loading(false);
                                                            this.updateOrderForm();

                                                        }, () => {
                                                            (window as any).loading(false);
                                                            this.updateOrderForm();
                                                        });
                                                    }}
                                                    handleRemoveQuantity={(quantity) => {
                                                        (window as any).loading(true);
                                                        vtexjs.checkout.updateItems([{
                                                            index,
                                                            quantity,
                                                        }]).then(() => {
                                                            (window as any).loading(false);
                                                            this.updateOrderForm();

                                                        }, () => {
                                                            (window as any).loading(false);
                                                            this.updateOrderForm();
                                                        });
                                                    }}
                                                    handleRemoveCart={() => {
                                                        (window as any).loading(true);
                                                        vtexjs.checkout.removeItems([
                                                            {
                                                                index,
                                                                quantity: 0,
                                                            },
                                                        ]).then(() => {
                                                            (window as any).loading(false);
                                                            this.updateOrderForm();
                                                        });
                                                    }}
                                                    max={100000} />
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <header className="mini-cart-footer">
                            <div className="mini-cart-total">
                                <span className="total-text">Total:</span>
                                <span className="total-number">{UtilsService.formatePrice(this.state.orderForm.value, ",")}</span>
                            </div>
                            <div className="wrapper-actions">
                                <a href="/checkout" className="button-go-to-checkout">Finalizar compra</a>
                                <button className="button-continue" onClick={this.closeCart.bind(this)}>Continuar comprando</button>
                            </div>
                        </header>
                    </div>
                </div>
            ) : ""
        );
    }
}