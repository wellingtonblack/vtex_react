import * as React from "react";
import { BaseController } from "../base.controller";
import "./product.scss";
import { SliderProductComponent } from "./components/slider-product/slider-product.component";
import { CompositionWashingComponent } from "./components/composition-washing/composition-washing.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";

export class ProductController extends BaseController {
    
    constructor() {
        super();
        this.renderComponent(<SliderProductComponent />, "root-slider-produto");
        this.renderComponent(<CompositionWashingComponent />, "root-composition-washing");
        this.renderComponent(<ReviewsComponent />, "root-reviews");
        
    }
}
