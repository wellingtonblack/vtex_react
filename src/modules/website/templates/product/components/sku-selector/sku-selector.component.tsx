import * as React from "react";
import { ProductSlider, SkuSlider } from "../slider-product/models/product-slider";
import "./sku-selector.component.scss";
import { ProductVariation, ProductsVariationImage } from "../../../shared/models/product-variation.model";
import { DataProductService } from "../../../shared/services/data-products.service";
import { ProductApi, Item, Images } from "../../../shared/models/product-api.model";
import { VirtualTasterComponent } from "./components/virtual-taster/virtual-taster.component";

export interface SkuSelectorProps {
    productSlider: ProductSlider;
    productVariation: ProductVariation;
    isChooseSku?: boolean;
    handleSelecteSize(sku: SkuSlider): void;
}

export interface SkuSelectorState {
    productsRelation: ProductApi[];
}

declare const vtexjs: any;
export class SkuSelectorComponent extends React.Component<SkuSelectorProps, SkuSelectorState> {

    constructor(props: SkuSelectorProps) {
        super(props);

        this.state = {
            productsRelation: null,
        };

        this.getSelector = this.getSelector.bind(this);

        new vtexjs.Catalog()
            .getCurrentProductWithVariations()
            .then((data: ProductSlider) => {
                DataProductService.getRelations(data.productId)
                    .then((productsRelation: ProductApi[]) => {
                        this.setState({
                            productsRelation,
                        });
                    });
            });
    }

    public handleSelecteSize(sku: SkuSlider) {
        if (sku.available) {
            this.props.handleSelecteSize(sku);
        }
    }

    public getImageColor(item: Item): Images {
        return item.images.find((image) => image.imageLabel.toLocaleLowerCase() === "swatch");
    }

    public getCollors() {
        if (!this.state.productsRelation) {
            return;
        }

        const products: ProductApi[] = [];

        this.state.productsRelation.forEach((product) => {

            const isproduct = products.find((_product) => {
                if (_product.productId === product.productId) {
                    return true;
                }
            });

            if (!isproduct) {
                products.push(product);
            }
        });

        return products.map((product) => <a href={product.link} style={{ backgroundImage: `url('${this.getImageColor(product.items[0]).imageUrl}')` }} className="item-selector-color"></a>);
    }

    public getSelector(key: string) {

        let element: any;

        switch (key.toLocaleLowerCase()) {
            case "cor texto":

                const imagesReturn = this.props.productVariation ? this.props.productVariation.Images.find((image: ProductsVariationImage[], index: number) => {
                    if (image[0].Name.toLowerCase() === "swatch") {
                        return true;
                    }
                }) : [];

                element = (
                    <div className={`wrapper-selectors`}>
                        <div className="title-selector">
                            Cor: <span className="color-selected"> {` ${this.props.productSlider.dimensionsMap[key]}`}</span>
                        </div>
                        <div className="selectors color-selector">
                            {(this.props.productSlider) ? this.props.productSlider.dimensionsMap[key].map((color: string, index: number) => (<div style={{ backgroundImage: `url('${imagesReturn.length > 0 ? imagesReturn[4].Path : ""}')` }} className="item-selector-color active"></div>)) : ""}
                            {this.getCollors()}
                        </div>
                    </div>
                );
                break;
            case "tamanho":
                element = (
                    <div className={`wrapper-selectors`}>
                        <div className="title-selector">
                            <span>Tamanho:</span> <VirtualTasterComponent />
                        </div>
                        <div className="selectors">
                            {this.props.productSlider.skus.map((sku: SkuSlider, index: number) => (
                                <div
                                    className={`${sku.available ? "active" : "inactive"} ${(sku.selected) ? "selected" : "not-selected"} item-selector-size`}
                                    onClick={this.handleSelecteSize.bind(this, sku)}>
                                    {sku.dimensions[key]}
                                </div>
                            ))}
                        </div>
                        {(this.props.isChooseSku !== null && this.props.isChooseSku !== true) ? <div className="error">Escolha um tamanho</div> : ""}
                    </div>
                );
                break;

            default:
                break;
        }

        return element;
    }

    public render() {

        return (
            <div className="sku-selector-component">
                {(this.props.productSlider) ? (
                    Object.keys(this.props.productSlider.dimensionsMap).map((key) => (
                        this.getSelector(key)
                    ))
                ) : ""}
            </div>
        );
    }
}
