import * as React from "react";
import { UtilsService } from "../../../../../services/utils.service";
import "./flag-discount.component.scss";
import { FlagModel, FlagProps, FlagState } from "./flag-discount.model";

export class FlagDiscountComponent extends React.Component<FlagProps, FlagState> {

    constructor(props: any) {
        super(props);

        this.state = {
            percent: Math.round(100 * (this.props.oldPrice - this.props.price) / this.props.oldPrice),
        };
    }



    public render() {
        return (
            <div className="flag-discount-component" >
                {(this.state.percent > 0) ? <div className="flag-item">{this.state.percent} % OFF</div> : ""} 
            </div>
        );
    }
}


