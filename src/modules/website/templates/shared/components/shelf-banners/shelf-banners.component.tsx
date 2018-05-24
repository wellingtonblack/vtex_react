import React from "react/index";
import "./shelf-banners.scss";
import Slider from "react-slick";
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
        const textBanner = container.querySelector(".shelf-text").innerHTML;

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
        const settings = {
            arrows: true,
            dots: false,
            infinite: false,
            lazyLoad: true,
            swipeToSlide: true,
            focusOnSelect: true,
            nextArrow: <div className="arrow-next">{">"}</div>,
            prevArrow: <div className="arrow-prev">{"<"}</div>,
            slidesToScroll: 3,
            slidesToShow: 3,
            speed: 500,

            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: false,
                    },
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2.2,
                        slidesToScroll: 2,
                        arrows: false,
                    },
                }, {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        slidesToShow: 1.2,
                        slidesToScroll: 1,
                    },
                }],
        };
        return (
            <div className="container-fluid space-bottom wrapper shelf-banners-component">

                {(this.state.banners && this.state.banners.length > 0) ? (
                    <div className="shelf-banner container-fluid wrapper no-padding">
                        <TitleComponent> <div dangerouslySetInnerHTML={this.title()}></div></TitleComponent>
                        <Slider {...settings} className="slider-ref text-banner-shelf offset">
                            {this.state.banners.map((banner, index) => (<div className="shelfItem" key={index}><BannerCardComponent banner={banner} /></div>))}
                        </Slider>
                    </div>
                ) : ""}

            </div>
        );
    }

}