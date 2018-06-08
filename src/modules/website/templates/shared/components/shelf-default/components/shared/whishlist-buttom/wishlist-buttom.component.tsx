import * as React from "react";
import "./wishlist-buttom.component.scss";
import { WishlistProps, WishlistState } from "./wishlist.model";
import { WhishListModel } from "../../../../../models/wishlist.model";
import { DataWishlistService } from "../../../../../services/data-wishlist.service";
import { DataUserService } from "../../../../../services/data-user.service";
import { UserModel } from "../../../../../models/user.model";

export class WhishListComponent extends React.Component<WishlistProps, WishlistState> {

    /**
     *
     */
    constructor(props: WishlistProps) {
        super(props);

        this.state = {
            active: false,
            user: DataUserService.getUser(),
            product: null,
        };

        window.addEventListener("update.wishlist", (event: CustomEvent) => {
            const products = event.detail as WhishListModel[];
            products.forEach((item) => {
                if (item.productId === this.props.product.productId.toString()) {
                    this.setState({
                        active: true,
                        product: item,
                    });
                }
            });
        }, false);

        window.addEventListener("user.load", (event: CustomEvent) => {
            this.setState({
                user: event.detail as UserModel,
            });
        }, false);
    }

    public handleClick(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        if (!this.state.user || !this.state.user.IsUserDefined) {
            window.dispatchEvent(new CustomEvent("login"));
            window.scrollTo(500, 0);
            return;
        }

        if (this.state.active) {
            // remove 
            (window as any).loading(true);
            DataWishlistService.doUnmatchInProduct(this.state.product.id)
                .then((data: any) => {

                    window.dispatchEvent(new CustomEvent("load.wishlist", { detail: data }));
                    this.setState({
                        active: false,
                    });

                    (window as any).loading(false);
                }, () => {
                    (window as any).loading(false);
                });

        } else {

            const product: WhishListModel = {
                sku: this.props.product.skuId.toString(),
                name: this.props.product.name,
                user_email: this.state.user.Email,
                quantity: 1,
                color: "",
                size: "",
                ref_number: "",
                price: this.props.product.bestPriceFormated,
                image: this.props.product.imagePath,
                url: this.props.product.uri,
                productId: this.props.product.productId.toString(),
            };

            (window as any).loading(true);
            DataWishlistService.doMatchInProduct(product)
                .then((data) => {
                    window.dispatchEvent(new CustomEvent("load.wishlist", { detail: data }));
                    (window as any).loading(false);
                    this.setState({
                        active: true,
                    });
                }, () => {
                    (window as any).loading(false);
                });
        }
    }

    public render() {
        return (
            <div className={`component-whishlist`} >
                <svg onClick={this.handleClick.bind(this)} x="0px" y="0px" className={`${(this.state.active) ? "active" : "inactive"} icon-wishlist`} viewBox="0 0 14.719 13.235"> <path d="M10.527,0.525c-1.352,0-2.53,0.661-3.172,1.645 C6.714,1.187,5.536,0.525,4.185,0.525C2.149,0.525,0.5,2.021,0.5,3.865c0,3.374,6.855,8.736,6.855,8.736s6.856-5.224,6.856-8.736 C14.212,2.021,12.563,0.525,10.527,0.525z" />
                </svg>
                {(this.props.children) ? <span className="children">{this.props.children}</span> : ""}
            </div>
        );
    }
}


