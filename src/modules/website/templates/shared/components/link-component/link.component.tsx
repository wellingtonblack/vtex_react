import * as React from "react";
import { Product } from "../../models/product.model";
import { DataEnhancedService } from "../../services/data-enhanced.service";

export interface LinkProps {
    className: string;
    product: Product;
    children?: any; 
    index?: number; 
    onMouseOut?(): void;
    onMouseOver?(): void; 
}

export interface LinkState {
}

export class LinkComponent extends React.Component<LinkProps, {}> {

    constructor(props: any) {
        super(props);

        this.state = {
            load: true,
        };
    }

    
    public render() {
        return (
            <a onClick={(e) => {
                e.preventDefault();
                DataEnhancedService.productClick(this.props.product, 0)
                    .then(() => {
                        (window as any).location = this.props.product.uri; 
                    });
            }} href={this.props.product.uri} className={this.props.className} onMouseOver={this.props.onMouseOver}  onMouseOut={this.props.onMouseOut}>
                {this.props.children}
            </a>
        );
    }
}


