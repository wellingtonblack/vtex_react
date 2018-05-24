import { SETTINGS } from "./global.settings";

export class DataNewsletterService {
    
    
    public static db: any = {
        endpoint: () => {
            return `//intimissimi.vtexcommercestable.com.br/api/dataentities/NL/documents`; 
            // ;
        },
    };

    public static register(email: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `${this.db.endpoint()}/`,
                type: "PATCH",
                headers: SETTINGS.HEADERS,
                data: JSON.stringify({
                    email,
                    isChecked: true,
                }),
                success: (data: any) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}