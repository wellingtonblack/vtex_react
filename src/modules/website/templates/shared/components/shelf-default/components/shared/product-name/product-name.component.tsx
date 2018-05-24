import * as React from "react";
import Slider from "react-slick";
import "./product-name.component.scss";


export class ProductNameComponent extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <h3 className="product-name-component">{this.props.children}</h3>
        );
    }
}


