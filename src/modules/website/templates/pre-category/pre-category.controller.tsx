
import React from "react/index";
import { BaseController } from "../base.controller";
import { DomService } from "../shared/services/dom.service";
import { BannerMainComponent } from "./components/banner-category/banner-main-category.component";
import { ShelfBannersComponent } from "./components/shelf-banners/shelf-banners.component";
import { BannerMiddleComponent } from "./components/banner-middle-category/banner-middle-category.component";
import { ShelfComponent } from "../../../website/templates/shared/components/shelf-default/shelf.component";

import "./pre-category.scss";


export class PreCategoryController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<BannerMainComponent bannerHtml={DomService.getContent("banner-placeholder-category")} />, "root-banner-main");
        this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-placeholder")} />, "root-shelf-banners");
        this.renderComponent(<BannerMiddleComponent bannerHtml={DomService.getContent("middle-banner-placeholder")} />, "root-banner-middle");
        this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-middle-placeholder")} />, "root-shelf-banners-middle");
        // this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-middle-placeholder")} />, "root-shelf-banners-middle");
        // Shelf-collection-end
        this.renderShelfs();
    }

    private renderShelfs() {
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
    }

}
