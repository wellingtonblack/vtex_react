import "./button-nav-component.scss";
import React, { LabelHTMLAttributes } from "react/index";
import { ButtonNavMobProps, ButtonNavMobState } from "./close.model";

export class ButtonNavComponent extends React.Component<ButtonNavMobProps, ButtonNavMobState> {


    constructor(props: any) {
        super(props);
    }
    
    public render() {
        return (
            <div className="header-buttom-mobile">
                <div className={`hamburguer ${(this.props.open) ? "active" : "inactive"}`} onClick={this.props.handleOpen.bind(this, true)} >
                    <span></span>
                    <label htmlFor="change-hamburguer" ></label>
                </div>
            </div>
        );
    }
}