import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.scss";
import "slick-carousel/slick/slick.scss";
import { Product } from "../../models/product.model";
import { DomService } from "../../services/dom.service";
import { TitleComponent } from "../title/title.component";
import { CardTemplate1Component } from "./components/card-template1/card-template1.component";
import { CardTemplate2Component } from "./components/card-template2/card-template2.component";
import { CardTemplate3Component } from "./components/card-template3/card-template3.component";
import { CardTemplate4Component } from "./components/card-template4/card-template4.component";
import "./shelf.component.scss";
import { ShelfProps, ShelfState } from "./shelf.models";



export class ShelfComponent extends React.Component<ShelfProps, ShelfState> {

    constructor(props: any) {
        super(props);

        this.state = {
            products: DomService.getProducts(this.props.html),
            title: this.props.title,
        };
    }


    public render() {

        const settings = {
            arrows: true,
            dots: false,
            infinite: false,
            lazyLoad: true,
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

        let cards: any[] = [];

        if (this.props.template === "t1") {
            cards = this.state.products.map((product: Product, index: number) => <div className="shelfItem" key={index}><CardTemplate1Component index={index} defaultImage={this.props.defaultImage} width={498} heigth={773} sizeClass="col-xs-12" product={product} /></div>);
        } else if (this.props.template === "t2") {
            cards = this.state.products.map((product: Product, index: number) => <div className="shelfItem col-md-4 col-6" key={index}><CardTemplate2Component index={index} defaultImage={this.props.defaultImage} width={700} heigth={520} sizeClass="col-xs-12" product={product} /></div>);
        } else if (this.props.template === "t3") {
            cards = this.state.products.map((product: Product, index: number) => <div className="shelfItem col-md-4 col-12" key={index}><CardTemplate3Component index={index} defaultImage={this.props.defaultImage} width={700} heigth={520} sizeClass="col-xs-12" product={product} /></div>);
        } else if (this.props.template === "t4") {
            cards = this.state.products.map((product: Product, index: number) => <div className="shelfItem col-md-4 col-12" key={index}><CardTemplate4Component index={index} defaultImage={this.props.defaultImage} width={700} heigth={520} sizeClass="col-xs-12" product={product} /></div>);
        }

        let render = null;
        if (this.props.hasSlider) {
            render = <Slider {...settings}>
                {cards}
            </Slider>;
        } else {
            render = cards;
        }

        return (
            <div className={`container-fluid shelf-component wrapper space-bottom ${this.props.template}`}>
                <TitleComponent>{this.state.title}</TitleComponent>
                <div className={`${!this.props.hasSlider ? "row no-gutters" : ""} offset`}>
                    {render}
                </div>
            </div>
        );
    }
}


