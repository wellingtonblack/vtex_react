import { ProductApi } from "../models/product-api.model";
import { ProductVariation } from "../models/product-variation.model";


export class DataProductService {

    public static db: any = {
        endpoint: () => {
            return `/api/catalog_system/pub/products`;
        },
    };

    public static getProductsByCategory(paths: string[], search: string, orderby: string, _from: number = 1, _to: number = 9): Promise<ProductApi[]> {
        return new Promise<ProductApi[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/search/${(search) ? search : ""}${(paths && paths.length > 0) ? `?${paths.join("&")}&` : `?`}_from=${_from}&_to=${_to}&O=${orderby}`,
                type: "GET",
                success: (data: ProductApi[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public static getProductsById(productId: number): Promise<ProductApi> {
        return new Promise<ProductApi>((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/search?fq=productId:${productId}`,
                type: "GET",
                success: (data: ProductApi[]) => {
                    resolve(data[0]);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public static getSkuProduct(sku: number): Promise<ProductVariation> {
        return new Promise<ProductVariation>((resolve, reject) => {
            $.ajax({
                url: `/produto/sku/${sku}`,
                type: "GET",
                success: (data: ProductVariation[]) => {
                    resolve(data[0]);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public static getRelations(productId: number): Promise<ProductApi[]> {
        return new Promise<ProductApi[]>((resolve, reject) => {
            $.ajax({
                url: `/api/catalog_system/pub/products/crossselling/similars/${productId}`,
                type: "GET",
                success: (data: ProductApi[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}