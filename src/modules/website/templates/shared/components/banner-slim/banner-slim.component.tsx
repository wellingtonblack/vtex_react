import * as React from "react";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { BannerModel } from "../../../shared/models/ibanner.model";
import "./banner-slim.component.scss";


export interface IBannerProps {
    bannerHtml: string;
}

export interface IBannerState {
    banners: BannerModel[];
}

export class BannerSlimComponent extends React.Component<IBannerProps, IBannerState> {

    /**
     *
     */
    constructor(props: IBannerProps) {
        super(props);

        const dataImages: BannerModel[] = [];
        const bannerRightHtml: string = this.props.bannerHtml;
        const container = document.createElement("div");
        container.innerHTML = bannerRightHtml.trim();

        const linksRight = container.querySelectorAll("div");

        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < linksRight.length; index++) {
            const link: HTMLElement = linksRight[index];
            const image = link.querySelector("img");

            const src = image.getAttribute("src");
            const alt = image.getAttribute("alt");
            const href = link.querySelector("a").getAttribute("href");

            const _banner = dataImages.filter((banner) => {
                if (alt.toLowerCase().replace("mobile", "").toLowerCase().indexOf(banner.alt.toLowerCase().replace("mobile", "")) > -1) {
                    banner.srcMob = src;
                    return banner;
                }
            });

            if (_banner.length === 0) {
                dataImages.push({
                    alt,
                    href,
                    src,
                });
            }
        }
        this.state = {
            banners: dataImages,
        };
    }


    public render() {

        const banner = this.state.banners.map((image: BannerModel, index: number) => {

            const styleDesktop = {
                backgroundImage: `url("${image.src}")`,
            };

            const styleMobile = {
                backgroundImage: `url("${image.srcMob}")`,
            };
            
            return (
                <div className="col" key={index}>
                    <a href={image.href} >
                        <TitleComponent>{image.alt}</TitleComponent>
                        <div style={styleDesktop} className="bg-slim desktop" />
                        <div style={styleMobile} className="bg-slim mobile" />
                    </a>
                </div>
            );
        });

        return (
            <div className="container-fluid wrapper  banner-slim-component">
                <div className="row no-gutters">
                    {banner}
                </div>
            </div>
        );
    }
}

