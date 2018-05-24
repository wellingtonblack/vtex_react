import * as React from "react";
import Slider from "react-slick";
import "./title.component.scss";


export class TitleComponent extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <h2 className="title-component">{this.props.children}</h2>
        );
    }
}


