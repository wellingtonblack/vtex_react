import "./banner-main-category.scss";
import React from "react/index";
import { BannerModel } from "../../../shared/models/ibanner.model";
import { DomService } from "../../../shared/services/dom.service";
import { ButtonCalltoAction } from "../button-call-to-action.component/button-call-to-action.component";


export interface IBannerProps {
    bannerHtml: string;
}

export interface IBannerState {
    textBanner: string;
    banners: BannerModel[];
    bannerColor?: string;
}

declare const $: any;
export class BannerMainComponent extends React.Component<IBannerProps, IBannerState> {

    constructor(props: IBannerProps) {
        super(props);

        const bannerMainHtml = this.props.bannerHtml;
        const wrapper = document.createElement("div");
        wrapper.innerHTML = bannerMainHtml.trim();
        const textBanner = wrapper.querySelector(".banner-text").innerHTML;

        const banners: BannerModel[] = DomService.getBanners(this.props.bannerHtml);
        let bannerColor = "";
        const body = document.querySelector("body");
        for (let i = 0; i < body.classList.length; i++) {
            if (body.classList.item(i) && body.classList.item(i).indexOf("banner-color") > -1) {
                bannerColor = body.classList.item(i).replace("banner-color:", "");
            }
        }

        this.state = {
            textBanner,
            banners,
            bannerColor,
        };
    }

    public componentWillMount() {
        window.dispatchEvent(new CustomEvent("change.color", { detail: this.state.bannerColor }));
        window.addEventListener("header.load", () => {
            window.dispatchEvent(new CustomEvent("change.color", { detail: this.state.bannerColor }));
        });
    }

    public title(): any {
        return { __html: this.state.textBanner };
    }

    public render() {

        const style = {
            backgroundColor: this.state.bannerColor || "",
        };

        return (
            <div style={style} className="container-fluid space-bottom banner-main-category-component">
                <div className="row no-gutters" >
                    {(this.state.banners && this.state.banners.length > 0) ? (
                        <div className="wrapper-banner container-fluid wrapper">
                            <div className="text-banner-wrapper">

                                <div className="box-banner-text">
                                    <div className="text" dangerouslySetInnerHTML={this.title()} />
                                    <ButtonCalltoAction href={this.state.banners[0].href}>Compre Já</ButtonCalltoAction>
                                </div>

                            </div>
                            <div className="banner-imagem">
                                <img src={$(window).width() < 768 ? this.state.banners[0].srcMob : this.state.banners[0].src} alt="" />
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        );
    }
}