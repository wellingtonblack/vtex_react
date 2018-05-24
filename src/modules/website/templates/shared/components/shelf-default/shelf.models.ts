import { Product } from "../../models/product.model";

// tslint:disable-next-line:interface-name
export interface ShelfState {
    products: Product[];
    title: string;
} 

// tslint:disable-next-line:interface-name
export interface ShelfProps {
    html: string;
    template: string;
    title: string;
    defaultImage: string;
    hasSlider: boolean;
} 