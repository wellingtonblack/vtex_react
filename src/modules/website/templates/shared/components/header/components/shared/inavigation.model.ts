import { ItemModel } from "./item.model";

export interface INavigationProps {
    items: ItemModel[];
}

export interface INavigationState {
    items: ItemModel[];
    changeColor?: string;
}