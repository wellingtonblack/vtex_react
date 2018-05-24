import "babel-polyfill";
import "./polyfill-custom-event";
import "./service-worker.config";
import "./assets/fonts/fonts.module";


// global 
import { GlobalController } from "./templates/global/global.controller";
const globalController = new GlobalController();

const body = document.querySelector("body");

import(/* webpackChunkName: "shared" */"./templates/shared/shared.module").then(() => {
    window.dispatchEvent(new CustomEvent("header.lead"));

    if (body.classList.contains("home-page")) {
        import(/* webpackChunkName: "home" */"./templates/home/home.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("department")) {
        import(/* webpackChunkName: "department" */"./templates/departament/departament.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("pre-category")) {
        import(/* webpackChunkName: "category" */"./templates/pre-category/pre-category.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("product-page-2018")) {
        import(/* webpackChunkName: "product" */"./templates/product/product.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("everywear")) {
        import(/* webpackChunkName: "product" */"./templates/everywear/everywear.module").then(() => {
            body.classList.add("active-content");
        });
    }
});


