import * as React from "react";
import "./order-by.component.scss";

export interface OrderByProps {
    hidelabel?: boolean;
    orderBy: string;
    onChange(value: string): void;
}


export interface OrderByState {

}

export class OrderByComponent extends React.Component<OrderByProps, OrderByState> {

    constructor(props: OrderByProps) {
        super(props);

    }

    public render() {
        return (
            <div className="order-by-component">
                {(!this.props.hidelabel) ? (<label htmlFor="order">ORDERNAR: </label>) : ""}
                <select value={this.props.orderBy} onChange={(e) => {
                    this.props.onChange(e.target.value);
                }}>
                    <option value="OrderByReleaseDateDESC">Data de lançamento</option>
                    <option value="OrderByPriceASC">Menor preço</option>
                    <option value="OrderByPriceDESC">Maior preço</option>
                    <option value="OrderByTopSaleDESC">Mais vendidos</option>
                    <option value="OrderByReviewRateDESC">Mais avaliados</option>
                    <option value="OrderByNameASC">A-Z</option>
                    <option value="OrderByNameDESC">Z-A</option>
                    <option value="OrderByBestDiscountDESC">Melhores descontos</option>
                </select>
            </div>
        );
    }
}
