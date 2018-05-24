import { BaseController } from "../base.controller";
import { DataUserService } from "../shared/services/data-user.service";
import { GlobalUser, GlobalPage } from "../shared/models/datalayer.models";
import { DataEnhancedService } from "../shared/services/data-enhanced.service";

declare const vtexjs: any;

export class GlobalController extends BaseController {

    constructor() {
        super();

        this.globalEnhanced();
    }

    private globalEnhanced() {

        DataUserService.getCurrentUser()
            .then((data) => {

                let user: GlobalUser = null;

                if (data.IsUserDefined) {
                    user = {
                        name: data.FirstName,
                        email: data.Email,
                        user_id: data.UserId,
                        username: data.Email,
                        language: "pt-br",
                        types: [data.Gender],
                    };
                }

                const links = document.querySelectorAll(".bread-crumb a");
                const breadCrumb = [];
                if (links && links.length > 0) {
                    for (let index = 0; index < links.length; index++) {
                        const item = links[index];
                        breadCrumb.push(item.innerHTML);
                    }
                }

                const page: GlobalPage = {
                    breadcrumb: breadCrumb,
                    environment: "production",
                    pageTitle: (window as any).dataLayer[0].pageTitle,
                };

                DataEnhancedService.virtualPageview(user, page);
            });

    }
} 