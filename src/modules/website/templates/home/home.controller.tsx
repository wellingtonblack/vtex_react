import * as React from "react";
import { BaseController } from "../base.controller";
import { ShelfComponent } from "../shared/components/shelf-default/shelf.component";
import { BannerModel } from "../shared/models/ibanner.model";
import { SliderModel } from "../shared/models/islider.model";
import { DomService } from "../shared/services/dom.service";
import { BannerMainSlider } from "./components/banner-main/banner.component";
import { BannerSlimComponent } from "../shared/components/banner-slim/banner-slim.component";
import { RulerInformation } from "./components/ruler-information/ruler-information.component";
import { InstagramComponent } from "./components/shop-instagram/shop-instagram.component";
import { ShelfBannersSliderComponent } from "../shared/components/shelf-banners-slider/shelf-banners-slider.component";


export class HomeController extends BaseController {
  /**
   *
   */
  constructor() {
    super();

    this.renderComponent(<BannerMainSlider bannerHtml={DomService.getContent("banner-placeholder")} />, "root-banner-main");
    this.renderComponent(<ShelfBannersSliderComponent  bannerHtml={DomService.getContent("banner-placeholder-shelf")} />, "root-shelf-banner");
    this.renderComponent(<BannerSlimComponent bannerHtml={DomService.getContent("banner-placeholder-slim")} />, "root-banner-slim");
    this.renderComponent(<RulerInformation />, "root-ruler-information");
    this.renderComponent(<InstagramComponent/>, "root-instagram-component");
    this.renderShelfs();
  }

  
}
