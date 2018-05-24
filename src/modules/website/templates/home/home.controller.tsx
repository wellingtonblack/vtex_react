import * as React from "react";
import { BaseController } from "../base.controller";
import { ShelfComponent } from "../shared/components/shelf-default/shelf.component";
import { BannerModel } from "../shared/models/ibanner.model";
import { SliderModel } from "../shared/models/islider.model";
import { DomService } from "../shared/services/dom.service";
import { BannerMainSlider } from "./components/banner-main/banner.component";
import { BannerSlimComponent } from "./components/banner-slim/banner-slim.component";
import { RulerInformation } from "./components/ruler-information/ruler-information.component";
import { InstagramComponent } from "./components/shop-instagram/shop-instagram.component";
import { ShelfBannersComponent } from "../shared/components/shelf-banners/shelf-banners.component";


export class HomeController extends BaseController {
  /**
   *
   */
  constructor() {
    super();

    this.renderComponent(<BannerMainSlider bannerHtml={DomService.getContent("banner-placeholder")} />, "root-banner-main");
    this.renderComponent(<ShelfBannersComponent  bannerHtml={DomService.getContent("banner-placeholder-shelf")} />, "root-shelf-banner");
    this.renderComponent(<BannerSlimComponent bannerHtml={DomService.getContent("banner-placeholder-slim")} />, "root-banner-slim");
    this.renderComponent(<RulerInformation />, "root-ruler-information");
    this.renderComponent(<InstagramComponent/>, "root-instagram-component");
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
