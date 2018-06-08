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
        import(/* webpackChunkName: "everywear" */"./templates/everywear/everywear.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("landing-template-1")) {
        import(/* webpackChunkName: "landing-template-1" */"./templates/landing-template1/landing-template1.module").then(() => {
            body.classList.add("active-content");
        });
    } else if (body.classList.contains("busca-vazia")) {
        import(/* webpackChunkName: "busca-vazia" */"./templates/busca-vazia/busca-vazia-module").then(() => {
            body.classList.add("active-content");
        });
    } else {
        body.classList.add("active-content");

    }
});


