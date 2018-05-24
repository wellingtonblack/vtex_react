import * as React from "react";
import * as ReactDOM from "react-dom";

export class BaseController {

    public renderComponent(reactElement: React.ReactElement<any>, ref: string, element?: Element) {

        if (element) {
            ReactDOM.render(reactElement, element);
            return;
        }
        
        const elementRef = document.getElementById(ref);
        if (elementRef) {
            ReactDOM.render(reactElement, elementRef);
        }
    }
}