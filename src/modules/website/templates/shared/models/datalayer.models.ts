export interface ProductImpressionModel {
    name: string;
    id: string;
    price: number;
    brand: string;
    category: string;
    variant: string;
    list: string;
    position?: number;
    quantity?: number;
}


export interface GlobalUser {
    name: string;
    username?: string;
    user_id: string;
    email: string;
    language?: string;
    types?: string[];
    facebook_id?: number;
    twitter_id?: number;
}

export interface GlobalPage {
    type?: string;
    pageTitle?: string;
    breadcrumb: string[];
    environment: string;
}