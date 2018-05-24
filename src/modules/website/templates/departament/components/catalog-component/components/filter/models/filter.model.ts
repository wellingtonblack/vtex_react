
import { FilterResultModel } from "./filter-result.model";
import { PathModel } from "../../../models/path.model";

export interface FilterProps {
    params: PathModel;
    handleSearchSpecification?(specificationsFilter: string[]): void;
}

export interface FilterState {
    filter?: FilterResultModel;
    filters?: string[];
    filterPath: string;
    filterOpen: boolean;
}