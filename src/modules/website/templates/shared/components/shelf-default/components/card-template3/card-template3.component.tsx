import * as React from "react";
import { ButtonCartComponent } from "../../../buttom-default/buttom-default.component";
import { CardProp, CardState } from "../shared/card.model";
import { FlagDiscountComponent } from "../shared/flag-discount/flag-discount.component";
import { FlagComponent } from "../shared/flag-promotion/flag-promotion.component";
import { ProductPriceComponent } from "../shared/product-price/product-price.component";
import { ProductNameComponent } from "../shared/product-name/product-name.component";
import { WhishListComponent } from "../shared/whishlist-buttom/wishlist-buttom.component";
import { UtilsService } from "../../../../services/utils.service";
import "./card-template3.component.scss";
import { ImageComponent } from "../../../image/image.component";
import { LinkComponent } from "../../../link-component/link.component";


export class CardTemplate3Component extends React.Component<CardProp, CardState> {

    constructor(props: any) {
        super(props);

        if (!this.props.product) {
            return;
        }

        this.state = {
            pathDefault: "",
            pathFront: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageFront),
            path: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imagePath),
            pathWearFront: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageWearFront),
            pathWearBack: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageWearBack),
            backimage: false,
        };
    }

    public componentDidMount() {
        if (!this.props.product) {
            return;
        }

        switch (this.props.defaultImage) {
            case "ft":
                this.setState({
                    pathDefault: (this.state.pathFront) ? this.state.pathFront : this.state.pathFront,
                });
                break;
            case "wf":
                this.setState({
                    pathDefault: (this.state.pathWearFront) ? this.state.pathWearFront : this.state.pathFront,
                });
                break;
            case "wb":
                this.setState({
                    pathDefault: (this.state.pathWearBack) ? this.state.pathWearBack : this.state.pathFront,
                });
                break;
            default:
                this.setState({
                    pathDefault: this.state.pathFront,
                });
                break;
        }
    }

    public handleAddToCart(productId: number) {
        const event = new CustomEvent("add.to.cart", {
            detail: {
                productId: parseInt(productId.toString()),
            },
        });
        document.dispatchEvent(event);
    }



    public render() {
        return (
            this.props.product ? (
                <LinkComponent
                    index={this.props.index}
                    product={this.props.product}
                    className={`card-component-template3 ${this.props.sizeClass}`}
                    onMouseOver={() => {
                        this.setState({ backimage: true });
                    }}
                    onMouseOut={() => {
                        this.setState({ backimage: false });
                    }}>
                    <div className="image img-responsive">
                        <div className="wrapper-flag">
                            <FlagDiscountComponent oldPrice={this.props.product.listPrice} price={this.props.product.bestPrice} />
                            <FlagComponent flagsHtml={this.props.product.hightLight} />
                        </div>
                        <WhishListComponent product={this.props.product} />
                        <ImageComponent className={this.props.defaultImage} src={(this.props.hoverBack && this.state.backimage && this.state.pathWearBack) ? this.state.pathWearBack : this.state.pathDefault} alt={this.props.product.name} />
                    </div>
                    <div className={`${this.props.product.hasBestPrice ? "hasbestprice" : ""} card-footer-wrapper`}>
                        <ProductNameComponent>{this.props.product.name}</ProductNameComponent>
                        {(this.props.product.hasBestPrice) ? (
                            <div className="oldprice">
                                <span>DE:</span> <ProductPriceComponent>{UtilsService.formatePrice(this.props.product.listPrice, ",")}</ProductPriceComponent>
                            </div>
                        ) : ""}
                        <ProductPriceComponent>{UtilsService.formatePrice(this.props.product.bestPrice, ",")}</ProductPriceComponent>
                    </div>
                </LinkComponent>
            ) : ""
        );
    }
}


