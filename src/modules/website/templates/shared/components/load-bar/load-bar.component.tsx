import * as React from "react";
import "./load-bar.component.scss";
import { LoadBarProps, LoadBarState } from "./load-bar.model";


export class LoadbarComponent extends React.Component<LoadBarProps, LoadBarState> {

    constructor(props: any) {
        super(props);

        this.state = {
            active: false,
        };

        window.addEventListener("load.bar", (event: CustomEvent) => {
            this.setState({
                active: event.detail as boolean,
            });
        }, false);

        (window as any).loading = (state: boolean) => {
            window.dispatchEvent(new CustomEvent("load.bar", { detail: state }));
        };
    }


    public render() {

        return (
            this.state.active ? (
                <div className={`load-bar-component`}>

                    <div className="progress-materializecss">
                        <div className="indeterminate"></div>
                    </div>

                </div>
            ) : ""
        );
    }
}


