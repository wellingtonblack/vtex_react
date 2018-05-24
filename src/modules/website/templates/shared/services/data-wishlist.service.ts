import { SETTINGS } from "./global.settings";
import { WhishListModel } from "../models/wishlist.model";

export class DataWishlistService {

    public static db: any = {
        endpoint: () => {
            return `//intimissimi.vtexcommercestable.com.br/api/dataentities/WL`;
        },
    };

    public static getProducts(email: string): Promise<WhishListModel[]> {
        return new Promise<WhishListModel[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/search?_where=user_email=${email}&_fields=sku,id,name,quantity,color,size,ref_number,price,image,url,productId&cache=${Math.random()}`,
                headers: SETTINGS.HEADERS,
                type: "GET",
                success: (data: WhishListModel[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }


    public static doMatchInProduct(product: WhishListModel): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/documents?cache=${Math.random()}`,
                headers: SETTINGS.HEADERS,
                type: "PUT",
                data: JSON.stringify(product),
                cache: false,
                success: (data: any) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public static doUnmatchInProduct(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/documents/${id}?cache=${Math.random()}`,
                headers: SETTINGS.HEADERS,
                type: "DELETE",
                cache: false,
                success: (data: any) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}