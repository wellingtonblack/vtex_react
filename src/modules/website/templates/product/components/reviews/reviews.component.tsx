import * as React from "react";
import "./reviews.component.scss";

export interface ReviewsProps {

}

export interface ReviewsState {
    isLoad: boolean;
}

declare const _trustvox: any;
declare const skuJson: any;

export class ReviewsComponent extends React.Component<ReviewsProps, ReviewsState> {


    public element: HTMLDivElement;
    public isLoad: any;
    constructor(props: ReviewsProps) {
        super(props);

        this.state = {
            isLoad: false,
        };
    }

    public componentWillMount() {

        this.isLoad = () => {
            if (window.innerHeight - this.element.getBoundingClientRect().bottom < 100 && !this.state.isLoad) {
                this.setState({
                    isLoad: true,
                }, () => {
                    (window as any)._trustvox = [];
                    _trustvox.push(["_storeId", "70531"]);
                    _trustvox.push(["_productId", skuJson.productId]);
                    _trustvox.push(["_productName", skuJson.name]);
                    _trustvox.push(["_productPhotos", [skuJson.skus[0].image]]);

                    const script = document.createElement("script");
                    script.src = "//rate.trustvox.com.br/widget.js";
                    script.async = true;
                    document.body.appendChild(script);

                    const tv = document.createElement("script");
                    tv.type = "text/javascript";
                    tv.async = true;
                    tv.charset = "UTF-8";
                    tv.src = "//static.trustvox.com.br/assets/widget.js";
                    const s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(tv, s);
                    window.removeEventListener("scroll", this.isLoad, false);
                });
            }
        };
        window.addEventListener("scroll", this.isLoad);
    }

    public render() {
        return (
            <div ref={(ref) => { this.element = ref; }} className="reviews-component container-fluid wrapper">
                <h3 id="trustvox-reviews">Pergunte e veja opiniões de quem já comprou</h3>
                <div id="_trustvox_widget"></div>
            </div>
        );
    }
}
