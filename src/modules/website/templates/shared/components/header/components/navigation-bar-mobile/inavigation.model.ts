
import { ProductSearchBar } from "../search-bar/product-search-bar-model";
import { UserModel } from "../../../../models/user.model";
import { ItemModel } from "../shared/item.model";

export interface INavigationProps {
    items: ItemModel[];
    show: boolean;
    user: UserModel;
    handleClose(): void;
}

export interface INavigationState {
    items: ItemModel[];
    searchProducts?: ProductSearchBar[];
}