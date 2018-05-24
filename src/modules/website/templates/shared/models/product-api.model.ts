export interface ProductApi {
    "Composição": string[];
    "Cuidados": string[];
    categories?: string[];
    productId: string;
    items: Item[];
    productName: string;
    productReference: string;
    link: string;
    brand: string;
}

export interface Item {
    itemId: string;
    images: Images[];
    name: string;
    nameComplete: string;
    complementName: string;
    sellers: Seller[];

}

export interface Images {
    imageId: string;
    imageLabel: string;
    imageTag: string;
    imageUrl: string;
    imageText: string;

}
export interface Seller {
    addToCartLink: string;
    sellerDefault: boolean;
    sellerId: string;
    sellerName: string;
    commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
    AvailableQuantity: number;
    CacheVersionUsedToCallCheckout: string;
    ListPrice: number;
    Price: number;
    PriceWithoutDiscount: number;
    Installments: Installment[];
}

export interface Installment {
    InterestRate: number;
    Name: string;
    NumberOfInstallments: number;
    PaymentSystemGroupName: string;
    PaymentSystemName: string;
    TotalValuePlusInterestRate: number;
    Value: number;
}