
import { FilterResultModel } from "../models/filter-result.model";
import { SETTINGS } from "../../../../../../shared/services/global.settings";

export class FilterService {
    public static getFilter(param: string): Promise<FilterResultModel> {
        return new Promise<FilterResultModel>((resolve, reject) => {
            $.ajax({
                url: `${SETTINGS.API().FILTER_SEARCH}${param}`,
                type: "GET",
                success: (data: FilterResultModel) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}