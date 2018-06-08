import "./footer.component.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseController } from "../../../base.controller";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";


declare const $: any;
export class FooterController extends BaseController {

    constructor() {
        super();
        this.renderComponent(<NewsletterComponent />, "root-newsletter-component");

        // load selo ebit
        const script = document.createElement("script");
        script.src = "//imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?76970";
        script.async = true;
        script.id = "getSelo";
        document.body.appendChild(script);

        $(".opening").click(function() {
            $(this).next(".expanded").toggle("slow").next(".plus-mob").toggleClass("plusefeito");
        });

        // tslint:disable-next-line:only-arrow-functions
        // $(".footer-lang").click(function() {
        //     $(".footer-country").slideUp("slow").toggleClass("open-overlay");
        // });
    }
}


