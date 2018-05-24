import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.scss";
import "slick-carousel/slick/slick.scss";
import { ButtonCartComponent } from "../../../shared/components/buttom-default/buttom-default.component";
import { BannerModel } from "../../../shared/models/ibanner.model";
import { SliderModel } from "../../../shared/models/islider.model";
import { DomService } from "../../../shared/services/dom.service";
import "./banner.component.scss";

// export interface ShelfModel {
//   textBanner: string;
//   banners: BannerModel[];
// }

export interface ISliderProps {
  bannerHtml: string;
}

export interface ISliderState {
  images: BannerModel[];
}


export class BannerMainSlider extends React.Component<ISliderProps, ISliderState> {

  /**
   *
   */
  constructor(props: ISliderProps) {
    super(props);

    const bannerHtml: string = this.props.bannerHtml;

    const images: BannerModel[] = DomService.getBanners(this.props.bannerHtml);


    this.state = {
      images,
    };
  }

  public render() {

    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
    };

    const items = this.state.images.map((image: BannerModel, index: number) => {
      return (
        <div key={index}>
          <a href={image.href} >
            <div className="sliderPrincipal mobile" style={{ backgroundImage: `url(${image.srcMob})` }}></div>
          </a>
          <a href={image.href} >
            <div className="sliderPrincipal desktop" style={{ backgroundImage: `url(${image.src})` }}></div>
          </a>
          <div className="text-banner-main">
            <h2 className="text">{image.description}</h2>
          </div>
          <div className="bottom">
            <ButtonCartComponent link={image.href}>Compre já</ButtonCartComponent>
          </div>
        </div>
      );
    });

    return (
      <div className="banner-component container-fluid wrapper">
        <div className="row no-gutters">
          <Slider className="slider-ref" {...settings}>
            {items}
          </Slider>
        </div>
      </div>
    );
  }
}

