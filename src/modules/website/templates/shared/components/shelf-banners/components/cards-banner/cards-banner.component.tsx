import "./cards-banner.scss";
import { ButtonCalltoAction } from "../../../button-call-to-action.component/button-call-to-action.component";
import React from "react/index";
import { BannerModel } from "../../../../../shared/models/ibanner.model";

export interface BannerProps {
    banner: BannerModel;
}

export class BannerCardComponent extends React.Component<BannerProps> {
    public render() {
        return (
            <a href={this.props.banner.href} className="cards-banner-component col-md-4">
                <div className="banner-imagem">
                    <img src={this.props.banner.src} alt={this.props.banner.alt} />
                </div>
                <div className="text-description">
                    <div className="description-banner">{this.props.banner}</div>
                    <ButtonCalltoAction href={this.props.banner.href}>{this.props.banner.alt}</ButtonCalltoAction>
                </div>
            </a>
        );
    }
}