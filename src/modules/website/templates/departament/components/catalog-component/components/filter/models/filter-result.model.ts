export interface FilterResultModel {
    Brands: FilterItem[];
    CategoriesTrees: FilterItem[];
    Departments: FilterItem[];
    SpecificationFilters: any;
}

export interface FilterItem {
    Quantity: number;
    Name: string;
    Link: string;
    Children: FilterItem[];
}