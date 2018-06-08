import "./busca-vazia.scss";
import * as React from "react";
import { BaseController } from "../base.controller";
import { ShelfBannersSliderComponent } from "../shared/components/shelf-banners-slider/shelf-banners-slider.component";


export class BuscaVaziaController extends BaseController {
  /**
   *
   */
  constructor() {
    super();
    this.renderShelfs();
  }

  
}