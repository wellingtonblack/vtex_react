import { ItemModel } from "../shared/item.model";
import { UserModel } from "../../../../models/user.model";
import { OderformModel } from "../../../../models/orderform.model";

export interface HeaderProps {
    items: ItemModel[];
}

export interface HeaderState {
    headerColor?: string;
    user?: UserModel;
    numberOfProducts: number;
    openMobNav: boolean;
    orderForm: OderformModel;
}
