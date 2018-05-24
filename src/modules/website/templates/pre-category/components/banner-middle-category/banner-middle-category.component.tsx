import "./banner-middle-category.scss";
import React from "react/index";
import { BannerModel } from "../../../shared/models/ibanner.model";
import { DomService } from "../../../shared/services/dom.service";


export interface IBannerProps {
    bannerHtml: string;
}

export interface IBannerState {
    textBanner: string;
    banners: BannerModel[];

}
export class BannerMiddleComponent extends React.Component<IBannerProps, IBannerState> {
    public textBanner: any;
    constructor(props: IBannerProps) {
        super(props);

        this.state = {
            textBanner: "",
            banners: null,
        };

        const bannerMiddleHtml = this.props.bannerHtml;
        const container = document.createElement("div");
        container.innerHTML = bannerMiddleHtml.trim();
        const contenttext = container.querySelector(".description-middle-banner");

        if (!contenttext) {
            return;
        }
        const textBanner = container.querySelector(".description-middle-banner").innerHTML;

        const banners: BannerModel[] = DomService.getBanners(this.props.bannerHtml);
        this.state = {
            textBanner,
            banners,
        };
    }
    public title(): any {
        return { __html: this.state.textBanner };
    }

    public render() {
        const background = (this.state.banners && this.state.banners.length > 0) ? this.state.banners[0].src : "";
        const style = {
            backgroundImage: `url('${background}')`,
        };

        return (
            (this.state.banners && this.state.banners.length > 0) ? (<div style={style} className="container-fluid space-bottom banner-middle-category-component">
                <div className="row no-gutters container-middle">
                    <div className="wrapper-banner container-fluid wrapper">
                        <div className="text-banner-wrapper col-lg-6" dangerouslySetInnerHTML={this.title()}>

                        </div>
                    </div>
                </div>
            </div>) : ""
        );
    }
}