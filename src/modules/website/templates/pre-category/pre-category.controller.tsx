
import React from "react/index";
import { BaseController } from "../base.controller";
import { DomService } from "../shared/services/dom.service";
import { BannerMainComponent } from "./components/banner-category/banner-main-category.component";
import { ShelfBannersComponent } from "../shared/components/shelf-banners/shelf-banners.component";
import { BannerMiddleComponent } from "./components/banner-middle-category/banner-middle-category.component";
// import { ShelfComponent } from "../../../website/templates/shared/components/shelf-default/shelf.component";

import "./pre-category.scss";


export class PreCategoryController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<BannerMainComponent bannerHtml={DomService.getContent("banner-placeholder-category")} />, "root-banner-main");
        this.renderComponent(<BannerMiddleComponent bannerHtml={DomService.getContent("middle-banner-placeholder")} />, "root-banner-middle");
        this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-placeholder")} />, "root-shelf-banners");
        this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-middle-placeholder")} />, "root-shelf-banners-middle");
        // this.renderComponent(<ShelfBannersComponent bannerHtml={DomService.getContent("shelf-banner-middle-placeholder")} />, "root-shelf-banners-middle");
        // Shelf-collection-end
        // this.renderShelfs();
        // this.renderShelfs("banners");
    }
}
