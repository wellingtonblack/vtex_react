import * as React from "react";
import { BaseController } from "../base.controller";
import { ShelfComponent } from "../shared/components/shelf-default/shelf.component";
import { BannerModel } from "../shared/models/ibanner.model";
import { SliderModel } from "../shared/models/islider.model";
import { DomService } from "../shared/services/dom.service";
import { DataProductService } from "../shared/services/data-products.service";
import { CatalogComponent } from "./components/catalog-component/catalog.component";
import "./departament.scss";

declare var $: any;
declare function unescape(s: string): string;

export class DepartamentController extends BaseController {
  constructor() {
    super();
    this.renderComponent(<CatalogComponent />, "root-filters-aside");
    
  }
}
