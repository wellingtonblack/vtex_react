import { Product } from "../../../../../models/product.model";
import { UserModel } from "../../../../../models/user.model";
import { WhishListModel } from "../../../../../models/wishlist.model";

export interface WishlistProps {
    product: Product;
}   

export interface WishlistState {
    active: boolean;
    user: UserModel;
    product: WhishListModel;
}