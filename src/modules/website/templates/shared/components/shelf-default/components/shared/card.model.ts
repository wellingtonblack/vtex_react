import { Product } from "../../../../models/product.model";

export interface CardProp {
    product: Product;
    defaultImage: string;
    sizeClass?: string;
    width: number;
    heigth: number;
    hoverBack?: boolean;
    index: number;
}

export interface CardState {
    path: string;
    pathDefault: string;
    pathFront?: string;
    pathWearFront?: string;
    pathWearBack?: string;
    backimage: boolean;
    
}