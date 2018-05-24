import { PathModel } from "./models/path.model";
import { ProductApi } from "../../../shared/models/product-api.model";

export interface CatalogProps {

}

export interface CatalogState {
    params: PathModel;
    filters: string[];
    products: ProductApi[];
    from: number;
    to: number;
    orderBy: string;
}