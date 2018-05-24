export interface ProductVariation {
    "Id": number;
    "IdProduct": number;
    "Ean": string;
    "Name": string;
    "Price": number;
    "ListPrice": number;
    "PriceWithoutDiscount": number;
    "BestInstallmentValue": number;
    "BestInstallmentNumber": number;
    "Availability": boolean;
    "AvailabilityMessage": string;
    "Images": ProductsVariationImage[][];
    "Reference": string;
    "HasExtendedWarranty": boolean;
    "HasExtendedWarrantyPage": boolean;
    "NotifyMe": boolean;
    "HasServiceAtProductPage": boolean;
    "HasServiceAtCartPage": boolean;
    "HasServiceAtServicePage": boolean;
    "RealHeight": number;
    "RealWidth": number;
    "RealLength": number;
    "RealWeightKg": number;
    "RewardValue": number;
    "DefaultSellerId": string;
    "SkuSellersInformation": SkuSellerInformation[];
    "SalesChannel": string;
}



export interface SkuSellerInformation {
    "IsDefaultSeller": boolean;
    "SellerId": string;
    "Name": string;
    "LogoUrl": string;
    "ListPrice": number;
    "Price": number;
    "PriceWithoutDiscount": number;
    "AvailableQuantity": number;
    "SalesChannel": string;
}

// export interface ProductsVariationImage {
//     [index: number]: Image[];
// }

export interface ProductsVariationImage {
    "IdArchive": string;
    "Name": string;
    "Path": string;
    "IsMain": boolean;
    "ArchiveTypeId": number;
}