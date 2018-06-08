import * as React from "react";
import * as ReactDOM from "react-dom";
import { ShelfComponent } from "./shared/components/shelf-default/shelf.component";
import { DomService } from "./shared/services/dom.service";
import { ShelfBannersComponent } from "./shared/components/shelf-banners/shelf-banners.component";

export class BaseController {

    public renderComponent(reactElement: React.ReactElement<any>, ref: string, element?: Element) {
        if (element) {
            ReactDOM.render(reactElement, element);
            return;
        }

        const elementRef = document.getElementById(ref);
        if (elementRef) {
            ReactDOM.render(reactElement, elementRef);
        }
    }

    public renderShelfs(shelf: string = "default") {

        switch (shelf) {
            case "default":
                const rootShelfs = document.querySelectorAll(".root-shelf-default");
                // tslint:disable-next-line:prefer-for-of
                for (let index = 0; index < rootShelfs.length; index++) {
                    const shelf = rootShelfs[index];
                    const list = shelf.querySelector(".shelf-default");

                    if (list) {
                        const html = shelf.innerHTML;
                        const shelfTitle = shelf.querySelector("h2");
                        const title = (shelfTitle) ? shelfTitle.innerText : "";
                        const template = list.classList.item(1);
                        const defaultImage = list.classList.item(2);
                        const hasSlider = (list.classList.item(3) === "sl") ? true : false;

                        const props: any = {
                            hasSlider,
                            title,
                            html,
                            template,
                            defaultImage,
                        };

                        this.renderComponent(<ShelfComponent {...props} />, null, shelf);
                    }
                }
                break;
            case "banners":
                const rootShelfsBanners = document.querySelectorAll(".root-shelf-banners");
                // tslint:disable-next-line:prefer-for-of
                for (let index = 0; index < rootShelfsBanners.length; index++) {
                    const shelf = rootShelfsBanners[index];
                    const listContents = shelf.querySelector(".content-banner");
                    if (listContents) {
                        this.renderComponent(<ShelfBannersComponent bannerHtml={listContents.innerHTML.replace(/\`/, "")} />, null, shelf);
                    }
                }
            default:
                break;
        }

    }
}