import { ProductSearchBar } from "./product-search-bar-model";


export interface DataSearchReturn {
    itemsReturned: ProductSearchBar[];
}

export interface SearchBarState {
    products: ProductSearchBar[];
    value: string;
}

export interface SearchBarProps {
    hideContainerBar?: boolean;
    handleSearch?(products: ProductSearchBar[]): void;
    handleClear?(): void;
}