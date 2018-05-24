import React, { LabelHTMLAttributes } from "react/index";
import "./search-list.component.scss";
import { ProductSearchBar } from "../../../search-bar/product-search-bar-model";
import { DomService } from "../../../../../../services/dom.service";

export interface SearchListProps {
    products: ProductSearchBar[];
}

export interface SearchListState {

}

export class SearchListComponent extends React.Component<SearchListProps, SearchListState> {


    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="search-list-component">
                <ul className="list-product">
                    {this.props.products && this.props.products.length > 0 ? (
                        this.props.products.map((product) => (
                            <li>
                                <a className="wrapper-product" href={product.href}>
                                    <div className="product-image">
                                        {product.thumb && product.thumb.trim() ? (<img src={DomService.getImagePath(product.thumb).replace(/25\-25/, "80-80")} alt="" />) : (
                                            <svg className="icon-search" x="0px" y="0px" viewBox="0 0 18 18" enable-background="new 0 0 18 18">
                                                <g>
                                                    <path fill="#010101" d="M7.043, 12.101c-2.738, 0-4.965-2.228-4.965-4.965c0-2.737, 2.227-4.964, 4.965-4.964s4.96, 2.227, 4.965, 4.964, C12.008, 9.873, 9.781, 12.101, 7.043, 12.101z M7.043, 3.171c-2.186, 0-3.965, 1.778-3.965, 3.964c0, 2.187, 1.779, 3.965, 3.965, 3.965, s3.965-1.779, 3.965-3.965C11.008, 4.95, 9.229, 3.171, 7.043, 3.171z" />
                                                </g>
                                                <g>
                                                    <rect x="8.952" y="12.73" transform="matrix(0.7109 0.7033 -0.7033 0.7109 13.0759 -5.3506)" fill="#010101" width="8.188" height="1" />
                                                </g>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="product-content">
                                        {product.name}
                                    </div>
                                </a>
                            </li>
                        ))
                    ) : (
                            <span className="title-search">Nenhum termo foi encontrado!</span>
                        )}
                </ul>
            </div>
        );
    }
}