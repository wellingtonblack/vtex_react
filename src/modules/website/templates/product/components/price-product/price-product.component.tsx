import * as React from "react";
import { ProductSlider, SkuSlider } from "../slider-product/models/product-slider";
import "./price-product.component.scss";
import { UtilsService } from "../../../shared/services/utils.service";

export interface PriceProductProps {
    sku: SkuSlider;
}

export interface PriceProductState {

}

export class PriceProductComponent extends React.Component<PriceProductProps, PriceProductState> {

    constructor(props: PriceProductProps) {
        super(props);
    }

   
    public render() {
        return (
            this.props.sku ? (
                <div className="price-product-component">
                    <em className="price-product">{this.props.sku.bestPriceFormated}</em>
                    {(this.props.sku.installments > 0) ? (
                        <em className="price-parcels">
                            ou {this.props.sku.installments}x de R$ {UtilsService.formatePrice(this.props.sku.installmentsValue, ",")}
                        </em>
                    ) : ""}
                </div>
            ) : ""
        );
    }
}
