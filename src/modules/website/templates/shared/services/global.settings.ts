
export class SETTINGS {

    public static HEADERS: any = {
        "x-vtex-api-appKey": "YJASDPEOPPVBGAAEIPBIESSAXOWTWBEAMZBUNAOLKKBLNAOZWSAVQUMGRZVOTLSOLUPGZGRIAPYUQGNWZXWEAIKRNUCNFZSZSMZSLHAQBSVAWSQKMYPWPOODJXTEDDCA",
        "x-vtex-api-appToken": "vtexappkey-intimissimi-EAAWGK",
        "Content-Type": "application/json",
        "Accept": "application/vnd.vtex.ds.v10+json",
        "REST-Range": "resources=0-60",
    };

    public static API() {
        return {
            FILTER_SEARCH: "/api/catalog_system/pub/facets/search/",
        };
    }

} 