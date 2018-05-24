import * as React from "react";
import "./shop-instagram.component.scss";

export interface InstagramProps {

}

export interface InstagramState {
    isLoad: boolean;
}

export class InstagramComponent extends React.Component<InstagramProps, InstagramState> {

    /**
     *
     */

    public element: any;
    public isLoad: any;
    constructor(props: any) {
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

                    const script = document.createElement("script");
                    script.src = "//socialbuyhtml.herokuapp.com/core/clientes/intimissimi/vitrine/dist/build.js";
                    script.async = true;
                    document.body.appendChild(script);
                    window.removeEventListener("scroll", this.isLoad, false);
                });
            }
        };

        window.addEventListener("scroll", this.isLoad);
    }

    public render() {
        return (
            <div ref={(ref) => { this.element = ref; }} className="instagram-component wrapper container-fluid">
                <h3>Shop instagram</h3>
                <div id="SBY-holder" className="insta" data-storename="intimissimibrasiloficial" data-showcase="120"></div>
                <div className="text-center box-cta" ><a className="btn whiteColor button-link-shop text-center" href="/shopnow/" target="_self">SHOP INSTAGRAM</a></div>
            </div>
        );
    }
}