export interface ItemModel {
    name: string;
    link: string;
    banners?: BannerItemModel[];
    isVisible?: boolean;
    isVisibleMob?: boolean;
    siblings?: Sibling[];
    size?: string;
    highlighted?: boolean;
}

export interface Sibling {
    name?: string;
    items: ItemModel[];
} 

export interface BannerItemModel {
    href?: string;
    src?: string;
} 