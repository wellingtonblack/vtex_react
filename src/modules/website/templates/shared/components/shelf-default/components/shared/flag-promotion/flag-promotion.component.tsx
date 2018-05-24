import * as React from "react";
import { UtilsService } from "../../../../../services/utils.service";
import "./flag-promotion.component.scss";
import { FlagModel, FlagProps, FlagState } from "./flag-promotion.model";

export class FlagComponent extends React.Component<FlagProps, FlagState> {

    constructor(props: any) {
        super(props);

        const flagsArray = UtilsService.findAll(/\<p\ class\=\"[a-z\s\-]*.\>[a-zA-Z\s\-]*.\/p>/, this.props.flagsHtml);

        const flags: FlagModel[] = [];

        flagsArray.forEach((flagHtml) => {
            const content: string = (flagHtml[0] as string).match(/\>[a-zA-Z\s\-].*\</)[0].replace(/\-/, " ").replace(/[\>\<]/g, "");
            const className: string = (flagHtml[0] as string).match(/class\=\"[a-zA-Z\s\-].+\"/g)[0].replace(/class=|\"/g, "");

            const flag: FlagModel = {
                className,
                content,
            };

            flags.push(flag);
        });

        this.state = {
            flags,
        };
    }



    public render() {
        return (
            <div className="flag-promotion-component">
                {this.state.flags.map((flag, index) => <div key={index} className={`flag-item ${flag.className}`}> {flag.content}</div>)}
            </div>
        );
    }
}


