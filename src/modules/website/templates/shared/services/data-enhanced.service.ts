import { Product } from "../models/product.model";
import { ProductImpressionModel, GlobalPage, GlobalUser } from "../models/datalayer.models";
import { resolve } from "dns";

export class DataLayerScope {
    public development: boolean = false;
    public rit: any = [];

    constructor() {
        if (this.development) {

            const _push = Array.prototype.push;
            this.rit.push = function(item: any) {

                if (item.ecommerce && item.ecommerce.eventCallback) {
                    item.ecommerce.eventCallback();
                }

                _push.apply(this, arguments);
            };

            this.rit.push((window as any).dataLayer[0]);
            (window as any).devDataLayer = this.rit;
            return this.rit;
        } else {
            return (window as any).dataLayer;
        }
    }
}

export class DataEnhancedService {
    public static dataLayer: any = new DataLayerScope();

    public static async productImpression(products: Product[]) {

        const data: ProductImpressionModel[] = [];


        for (let index = 0; index < products.length; index++) {
            const product = products[index];

            data.push({
                category: product.category,
                id: product.productId.toLocaleString(),
                list: this.dataLayer[0].pageCategory,
                name: product.name,
                position: index,
                variant: product.skuId.toString(),
                price: product.bestPrice,
                brand: product.brand,
            });
        }

        this.dataLayer.push({
            event: "productImpression",
            ecommerce: {
                currencyCode: "BRL",
                impressions: data,
            },
        });
    }

    public static productClick(product: Product, index: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: ProductImpressionModel = {
                category: product.category,
                id: product.productId.toLocaleString(),
                list: this.dataLayer[0].pageCategory,
                name: product.name,
                position: index,
                variant: product.skuId.toString(),
                price: product.bestPrice,
                brand: product.brand,
            };

            this.dataLayer.push({
                event: "productClick",
                ecommerce: {
                    currencyCode: "BRL",
                    click: {
                        actionField: { list: this.dataLayer[0].pageCategory },      // Nome da lista onde está o produto
                        products: [data],
                    },
                },
                eventCallback: () => {
                    resolve();
                },
            });
        });
    }

    public static async productDetailView(product: Product): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: ProductImpressionModel = {
                category: product.category,
                id: product.productId.toLocaleString(),
                list: this.dataLayer[0].pageCategory,
                name: product.name,
                variant: product.skuId.toString(),
                price: product.bestPrice,
                brand: product.brand,
            };

            this.dataLayer.push({
                event: "productDetailView",
                ecommerce: {
                    detail: {
                        actionField: { list: this.dataLayer[0].pageCategory },
                        products: [data],
                    },
                },
            });
        });
    }

    public static async removeFromCart(product: Product, quantity: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: ProductImpressionModel = {
                category: product.category,
                id: product.productId.toLocaleString(),
                list: this.dataLayer[0].pageCategory,
                name: product.name,
                variant: product.skuId.toString(),
                price: product.bestPrice,
                brand: product.brand,
                quantity,
            };

            this.dataLayer.push({
                event: "removeFromCart",
                ecommerce: {
                    remove: {
                        products: [data],
                    },
                },
            });
        });
    }

    public static async addToCart(product: Product, quantity: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const data: ProductImpressionModel = {
                category: product.category,
                id: product.productId.toLocaleString(),
                list: this.dataLayer[0].pageCategory,
                name: product.name,
                variant: product.skuId.toString(),
                price: product.bestPrice,
                brand: product.brand,
                quantity,
            };

            this.dataLayer.push({
                event: "addToCart",
                ecommerce: {
                    add: {
                        products: [data],
                    },
                },
            });
        });
    }


    public static async virtualPageview(user: GlobalUser, page: GlobalPage): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            this.dataLayer.push({
                user,
                page,
                event: "virtualPageview",
            });
        });
    }


}


