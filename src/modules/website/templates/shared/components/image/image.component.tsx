import * as React from "react";
import "./image.component.scss";

export interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

export interface ImageState {
    load: boolean;
    isload: boolean;
}

export class ImageComponent extends React.Component<ImageProps, ImageState> {

    public element: any;
    constructor(props: any) {
        super(props);

        this.state = {
            load: true,
            isload: false,
        };
        
    }

    public componentWillMount() {
        // const isLoad = () => {
        //     if (window.innerHeight - this.element.getBoundingClientRect().bottom < 100 && !this.state.isload) {
        //         this.setState({
        //             isload: true,
        //         });
        //     }
        // };

        // window.addEventListener("scroll", isLoad);
    }


    public render() {
        return (
            <div className="image-component" ref={(ref) => { this.element = ref; }}>
                {/* {(this.state.isload) ? : "" }  */}
                <img className={`${!this.state.load ? "active" : "inactive"} image ${(this.props.className) ? this.props.className : ""}`} onLoad={() => { this.setState({ load: false }); }} src={this.props.src} alt={this.props.alt} />
                {this.state.load ? (
                    <div className="wrapper-loading">
                        <div className="windows8">
                            <div className="wBall" id="wBall_1">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_2">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_3">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_4">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_5">
                                <div className="wInnerBall"></div>
                            </div>
                        </div>
                    </div>
                ) : ""}
            </div>
        );
    }
}


