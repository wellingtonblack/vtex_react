import * as React from "react";
import Slider from "react-slick";
import "./product-price.component.scss";
import { UtilsService } from "../../../../../services/utils.service";


export class ProductPriceComponent extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <h3 className="product-price-component">r$ {this.props.children} </h3>
        );
    }
}


