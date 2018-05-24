import React from "react/index";
import { CheckboxButtonProps, CheckboxButtonState } from "./checkbox-button.model";
import "./checkbox-button.component.scss";

export class CheckboxButton extends React.Component<CheckboxButtonProps, CheckboxButtonState> {

    constructor(props: CheckboxButtonProps) {
        super(props);
        this.state = {
            status: this.props.status,
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    public handleCheck() {

        this.setState({
            status: !this.state.status,
        }, () => {
            this.props.handleCheck(this.props.value, this.state.status);
        });
    }

    public render() {
        return (
            <div className="checkbox-button-component">
                <span className={`${(this.props.color) ? `color-selector ${this.props.color}` : ""} ${(this.state.status) ? "active " : "inactive "} checkbox-box`} onClick={this.handleCheck}>
                    {(this.props.innerContent && !this.props.color) ? this.props.children : ""}
                </span>
                {(!this.props.innerContent && !this.props.color) ? (<span className="chilldren" onClick={this.handleCheck}>
                    {this.props.children}
                </span>) : ""}
            </div>
        );
    }
}