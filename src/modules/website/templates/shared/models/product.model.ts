export interface Product {
    productId: number;
    name: string;
    skuId: number;
    brand: string;
    category: string;
    department: string;
    uri: string;
    bestPrice: number;
    bestPriceFormated: string;
    stock: boolean;
    numbersOfInstallment: number;
    installmentValue: number;
    listPrice: number;
    listPriceFormated: string;
    discountHightLight: string;
    hightLight: string;
    imagePath: string;
    imageFront: string;
    imageWearFront: string;
    imageWearBack: string;
    imageLookFront: string;
    imageLookBack: string;
    hasBestPrice: boolean;
    escapedName: string;
    departmentName: string;
}