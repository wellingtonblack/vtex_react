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
            <div className="cards-banner-component">
                <div className="image img-responsive">
                    <a className="linkBanner" href={this.props.banner.href}>
                        <img src={this.props.banner.src} alt={this.props.banner.alt} />
                    </a>
                </div>
                <div className="text-description">
                    <div className="description-banner">{this.props.banner.description}</div>
                    <ButtonCalltoAction href={this.props.banner.href}>compre já</ButtonCalltoAction>
                </div>
            </div>
        );
    }
}

