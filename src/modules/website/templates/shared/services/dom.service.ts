import { Product } from "../models/product.model";
import { BannerModel } from "../models/ibanner.model";
import { DataEnhancedService } from "./data-enhanced.service";

export class DomService {
    public static getProducts(html: string): Product[] {
        const div = document.createElement("div");
        div.innerHTML = html;

        const list = div.querySelectorAll(".shelf-default > ul > li:not(.helperComplement)");

        const products: Product[] = [];

        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < list.length; index++) {
            const item = list[index];

            const productId: number = (this.find("#getProductId", item) as any).value;
            const name: string = (this.find("#getProductName", item) as any).value;
            const skuId: number = (this.find("#getProductSkuId", item) as any).value;
            const brand: string = (this.find("#getProductBrand", item) as any).value;
            const category: string = (this.find("#getProductCategory", item) as any).value;
            const department: string = (this.find("#getProductDepartment", item) as any).value;
            const uri: string = (this.find("#getProductUri", item) as any).value;
            const bestPriceFormated: string = (this.find("#getProductBestPrice", item) as any).value;
            const bestPrice: number = this.formatMoney((this.find("#getProductBestPrice", item) as any).value);
            const stock: boolean = (this.find("#getProductStock", item) as any).value;
            const numbersOfInstallment: number = (this.find("#getProductNumbersOfInstallment", item) as any).value;
            const installmentValue: number = (this.find("#getProductInstallmentValue", item) as any).value;
            const listPriceFormated: string = (this.find("#getProductListPrice", item) as any).value;
            const listPrice: number = this.formatMoney((this.find("#getProductListPrice", item) as any).value);
            const discountHightLight: string = (this.find("#getProductDiscountHightLight", item) as any).value;
            const hightLight: string = (this.find("#getProductHightLight", item) as any).value;
            const hasBestPrice: boolean = ((this.find("#getProductHasBestPrice", item) as any).value === "True") ? true : false;
            const escapedName: string = (this.find("#getProductEscapedName", item) as any).value;
            const departmentName: string = (this.find("#getProductDepartmentName", item) as any).value;
            const imagePath: string = this.getImagePath((this.find("#getProductImage", item) as any).value);
            const imageFront: string = this.getImagePath((this.find("#getProductImageFront", item) as any).value);
            const imageWearFront: string = this.getImagePath((this.find("#getProductImageWearFront", item) as any).value);
            const imageWearBack: string = this.getImagePath((this.find("#getProductImageWearBack", item) as any).value);
            const imageLookFront: string = this.getImagePath((this.find("#getProductImageLookFront", item) as any).value);
            const imageLookBack: string = this.getImagePath((this.find("#getProductImageLookBack", item) as any).value);


            const schema: Product = {
                bestPrice,
                bestPriceFormated,
                brand,
                category,
                department,
                departmentName,
                discountHightLight,
                escapedName,
                hasBestPrice,
                hightLight,
                imagePath,
                imageFront,
                imageWearFront,
                imageWearBack,
                imageLookFront,
                imageLookBack,
                installmentValue,
                listPrice,
                listPriceFormated,
                name,
                numbersOfInstallment,
                productId,
                skuId,
                stock,
                uri,
            };
            products.push(schema);
        }

        DataEnhancedService.productImpression(products);

        return products;
    }

    public static getContent(ref: string): string {
        const element = document.getElementById(ref);

        if (!element) {
            return "";
        }

        return document.getElementById(ref).innerHTML.replace(/\`/, "");
    }


    public static getImagePath(image: string): string {
        if (!image) {
            return "";
        }

        return image.match(/src\s*=\s*"(.+?)"/)[0].replace(/[\\"]/g, "").replace("src=", "");
    }

    public static getBanners(bannerHtml: string): BannerModel[] {
        const dataImages: BannerModel[] = [];
        const container = document.createElement("div");
        container.innerHTML = bannerHtml.trim();

        const linksRight = container.querySelectorAll("div.box-banner");

        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < linksRight.length; index++) {
            const link: Element = linksRight[index];
            const image = link.querySelector("img");

            const src = image.getAttribute("src");
            const alt = image.getAttribute("alt").split(/\|/);
            const href = link.querySelector("a").getAttribute("href");

            const _banner = dataImages.filter((banner) => {
                if (alt[0].toLowerCase().replace("mobile", "").toLowerCase().indexOf(banner.alt.toLowerCase().replace("mobile", "")) > -1) {
                    banner.srcMob = src;
                    return banner;
                }
            });

            if (_banner.length === 0) {
                dataImages.push({
                    alt: alt[0],
                    description: (alt.length === 2) ? alt[1] : null,
                    href,
                    src,
                });
            }
        }

        return dataImages;
    }

    private static find(ref: string, element: Element): any {
        const find = element.querySelector(ref);
        return (find) ? find : { value: "" };
    }


    private static formatMoney(price: string): number {

        if (!price) {
            return 0;
        }
        return parseFloat(price.replace("R$", "").replace(/\./, "").replace(/\,/, "."));
    }


}