import * as React from "react";
import { ButtonCartComponent } from "../../../buttom-default/buttom-default.component";
import { CardProp, CardState } from "../shared/card.model";
import { WhishListComponent } from "../shared/whishlist-buttom/wishlist-buttom.component";
import "./card-template2.component.scss";
import { UtilsService } from "../../../../services/utils.service";
import { ImageComponent } from "../../../image/image.component";
import { LinkComponent } from "../../../link-component/link.component";



export class CardTemplate2Component extends React.Component<CardProp, CardState> {

    constructor(props: any) {
        super(props);
        this.state = {
            pathDefault: "",
            path: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imagePath),
            pathFront: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageFront),
            pathWearFront: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageWearFront),
            pathWearBack: UtilsService.cropImage(this.props.width, this.props.heigth, this.props.product.imageWearBack),
            backimage: false,
            
        };
    }

    public componentDidMount() {
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
        const style = {
            backgroundImage: this.props.product.imageFront,
            backgroundPosition: "cover",
        };
        return (
            <LinkComponent index={this.props.index} product={this.props.product} className={`card-component-template2 ${this.props.sizeClass}`}>
                <div className="image img-responsive">
                    <WhishListComponent product={this.props.product} />
                    <ImageComponent className={this.props.defaultImage} src={this.state.pathDefault} alt={this.props.product.name} />
                </div>
            </LinkComponent>
        );
    }
}


