import React from "react/index";
import "./button-call-to-action.scss";

export interface ButtonCallProp {
    href: string;
}

export class ButtonCalltoAction extends React.Component<ButtonCallProp> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <a className="button-cta" href={this.props.href}>
                {this.props.children}
            </a>
        );
    }
}