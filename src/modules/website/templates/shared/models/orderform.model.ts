export interface OderformModel {
    allowManualPrice: boolean;
    canEditData: boolean;
    isCheckedIn: boolean;
    value: number;
    items: OderformItem[];
}

export interface OderformItem {
    detailUrl: string;
    ean: string;
    name: string;
    price: string;
    quantity: number;
    sellingPrice: number;
    skuName: string;
    uniqueId: string;
    imageUrl: string;
    id: string;
    productId: string;
}