import * as React from "react";
import { BaseController } from "../base.controller";
import { ShelfComponent } from "../shared/components/shelf-default/shelf.component";
import { BannerModel } from "../shared/models/ibanner.model";
import { SliderModel } from "../shared/models/islider.model";
import { DomService } from "../shared/services/dom.service";
import { BannerMainSlider } from "../shared/components/banner-main/banner.component";
import { BannerSlimComponent } from "../shared/components/banner-slim/banner-slim.component";
import { ShelfBannersComponent } from "../shared/components/shelf-banners/shelf-banners.component";


export class Landing1Controller extends BaseController {
  /**
   *
   */
  constructor() {
    super();
    this.renderComponent(<BannerMainSlider bannerHtml={DomService.getContent("banner-placeholder")} />, "root-banner-main");
    this.renderComponent(<ShelfBannersComponent  bannerHtml={DomService.getContent("shelf-banner-placeholder")} />, "root-shelf-banners");
    this.renderComponent(<BannerSlimComponent bannerHtml={DomService.getContent("banner-placeholder-2")} />, "root-banner-middle");
    this.renderComponent(<ShelfBannersComponent  bannerHtml={DomService.getContent("shelf-banner-placeholder-2")} />, "root-shelf-banners-2");
    this.renderComponent(<BannerSlimComponent bannerHtml={DomService.getContent("banner-placeholder-slim")} />, "banner-placeholder-category");
    
    // this.renderShelfs();
  }
  
}
