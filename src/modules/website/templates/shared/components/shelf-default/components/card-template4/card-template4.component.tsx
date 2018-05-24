import * as React from "react";
import { ButtonCartComponent } from "../../../buttom-default/buttom-default.component";
import { CardProp, CardState } from "../shared/card.model";
import { FlagDiscountComponent } from "../shared/flag-discount/flag-discount.component";
import { FlagComponent } from "../shared/flag-promotion/flag-promotion.component";
import { ProductPriceComponent } from "../shared/product-price/product-price.component";
import { ProductNameComponent } from "../shared/product-name/product-name.component";
import { WhishListComponent } from "../shared/whishlist-buttom/wishlist-buttom.component";
import { UtilsService } from "../../../../services/utils.service";
import "./card-template4.component.scss";
import { ImageComponent } from "../../../image/image.component";


export class CardTemplate4Component extends React.Component<CardProp, CardState> {

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
                    pathDefault: this.state.pathFront,
                });
                break;
            case "wf":
                this.setState({
                    pathDefault: this.state.pathWearFront,
                });
                break;
            case "wb":
                this.setState({
                    pathDefault: this.state.pathWearBack,
                });
                break;
            default:
                this.setState({
                    pathDefault: this.state.path,
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
                <a 
                    href={this.props.product.uri} 
                    className={`card-component-template4 ${this.props.sizeClass}`}
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
                        <ImageComponent className={this.props.defaultImage} src={(this.props.hoverBack && this.state.backimage && this.state.pathWearBack) ? this.state.pathWearBack  : this.state.pathDefault} alt={this.props.product.name} />
                    </div>
                    <div className="card-footer-wrapper">
                        <ProductNameComponent>{this.props.product.name}</ProductNameComponent>
                    </div>
                </a>
            ) : ""
        );
    }
}


