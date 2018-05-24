import * as React from "react";
import "./vittual-taster.component.scss";

export interface VirtualTasterProps {

}

export interface VirtualTasterState {

}

declare const sb: any;
declare const $: any;

export class VirtualTasterComponent extends React.Component<VirtualTasterProps, VirtualTasterState> {

    public button: Element;
    constructor(props: VirtualTasterProps) {
        super(props);
    }

    public componentWillMount() {

        const script = document.createElement("script");
        script.src = "//virtual-fitting-room.sizebay.com/assets/plugin.js";
        script.async = true;
        document.body.appendChild(script);

        const plugincss = document.createElement("link");
        plugincss.rel = "stylesheet";
        plugincss.href = "//virtual-fitting-room.sizebay.com/assets/plugin.css";
        document.body.appendChild(plugincss);
        
        const fontcss = document.createElement("link");
        fontcss.rel = "stylesheet";
        fontcss.href = "//static.sizebay.com/font/styles.css";
        document.body.appendChild(fontcss);

        script.onload = () => {

            sb.embedded_indicator3({
                button: { id: "szb_bt_virtualfittingroom" },
                btn1: { name: "provador", border: false },
                // tslint:disable-next-line:variable-name
                on_show_button: (button: any, product_id: any, refresh_button: any) => {

                    sb.plugin3({
                        product_id,
                        button,
                        brand_logo: "//static.sizebay.com/store/intimissimi/Logo_.png",
                        config_repository: "intimissimi",
                        custom_theme: "//static.sizebay.com/themes/iframe/themes.dark-flat.css",
                        // tslint:disable-next-line:variable-name
                        on_init: (on_click: any) => {
                            sb.log("Virtual Fitting Room");
                            button.addEventListener("click", on_click);
                        },
                        on_close: refresh_button,
                    });

                    this.button.appendChild(button);
                },
                on_select_size: (size: any) => {
                    const behaivor = size;
                },
            });
        };

    }

    public render() {
        return (
            <div ref={(ref) => { this.button = ref; }} className="virtual-taster-component">
                <div></div>
                <div id="szb_bt_virtualfittingroom"></div>
            </div>
        );
    }
}
