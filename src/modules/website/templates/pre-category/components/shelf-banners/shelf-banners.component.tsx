import React from "react/index";
import "./shelf-banners.scss";
import { BannerProps } from "./models/shelf-banners.model";
import { BannerModel } from "../../../shared/models/ibanner.model";
import { DomService } from "../../../shared/services/dom.service";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ButtonCalltoAction } from "../button-call-to-action.component/button-call-to-action.component";
import { BannerCardComponent } from "./components/cards-banner/cards-banner.component";


export interface ShelfModel {
    textBanner: string;
    banners: BannerModel[];
}

export class ShelfBannersComponent extends React.Component<BannerProps, ShelfModel> {
    constructor(props: BannerProps) {
        super(props);

        const shelfBanners = this.props.bannerHtml;
        const container = document.createElement("div");
        container.innerHTML = shelfBanners.trim();
        const contenttext = container.querySelector(".shelf-text");

        if (!contenttext) {
            this.state = {
                textBanner: "",
                banners: null,
            };
            return;
        } else {
            const textBanner = contenttext.innerHTML;

            const banners: BannerModel[] = DomService.getBanners(this.props.bannerHtml);

            this.state = {
                textBanner,
                banners,
            };
        }
    }
    
    public title(): any {
        return { __html: this.state.textBanner };
    }

    public render() {

        return (
            (this.state.banners && this.state.banners.length > 0) ? (
                <div className="container-fluid space-bottom shelf-banners-component">
                    <div className="row no-gutters" >

                        <div className="shelf-banner container-fluid wrapper no-padding">
                            <TitleComponent> <div dangerouslySetInnerHTML={this.title()}></div> </TitleComponent>
                            <div className="text-banner-shelf">
                                {this.state.banners.map((banner) => (
                                    <BannerCardComponent banner={banner} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ) : ""
        );
    }

}