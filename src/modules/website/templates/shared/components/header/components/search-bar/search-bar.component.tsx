import * as React from "react";
import { ProductSearchBar } from "./product-search-bar-model";
import { DataSearchReturn, SearchBarState, SearchBarProps } from "./search-bar-model";
import { DomService } from "../../../../services/dom.service";
// tslint:disable-next-line:no-var-requires
const style = require("./search-bar.component.lazy.scss");


export class SearchBarComponent extends React.Component<SearchBarProps, SearchBarState> {

    constructor(props: any) {
        super(props);

        const accept: boolean = true;
        this.state = {
            products: [],
            value: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearProducts = this.clearProducts.bind(this);
    }

    public componentDidMount() {
        style.use();
    }

    public componentWillUnmount() {
        style.unuse();
    }

    public handleInputChange(e: any) {
        const value: string = e.target.value;
        this.setState({
            value,
        }, () => {
            if (this.state.value.length > 3) {
                (window as any).loading(true);
                fetch(`/buscaautocomplete/?productNameContains=${this.state.value}`)
                    .then((res: any) => res.json())
                    .then((res: DataSearchReturn) => {
                        (window as any).loading(false);
                        this.setState({
                            products: res.itemsReturned,
                        }, () => {
                            if (this.props.handleSearch) {
                                this.props.handleSearch(this.state.products);
                            }
                        });
                    }, () => {
                        (window as any).loading(false);
                    });
            }
        });

    }

    public clearProducts(e: any) {
        this.setState({ products: [] }, () => {
            if (this.props.handleClear) {
                this.props.handleClear();
            }
        });
    }

    public render() {
        return (
            <div className="search-bar-component">
                <form className="form-inline" method="GET" action={`/${this.state.value}`}>
                    {(this.state.products.length > 0) ? <button onClick={this.clearProducts} className="btn btn-outline-success fechar" type="button"><span>X</span></button> : ""}
                    <input onChange={this.handleInputChange} value={this.state.value} onClick={this.clearProducts} className="form-control" type="text" placeholder="o que você procura?" autoComplete="off" aria-label="Search" />
                    <button className="btn-search btn-outline-success lupa" type="submit">
                        <svg className="icon-header" x="0px" y="0px" viewBox="0 0 18 18" enable-background="new 0 0 18 18">
                            <g>
                                <path fill="#010101" d="M7.043, 12.101c-2.738, 0-4.965-2.228-4.965-4.965c0-2.737, 2.227-4.964, 4.965-4.964s4.96, 2.227, 4.965, 4.964, C12.008, 9.873, 9.781, 12.101, 7.043, 12.101z M7.043, 3.171c-2.186, 0-3.965, 1.778-3.965, 3.964c0, 2.187, 1.779, 3.965, 3.965, 3.965, s3.965-1.779, 3.965-3.965C11.008, 4.95, 9.229, 3.171, 7.043, 3.171z" />
                            </g>
                            <g>
                                <rect x="8.952" y="12.73" transform="matrix(0.7109 0.7033 -0.7033 0.7109 13.0759 -5.3506)" fill="#010101" width="8.188" height="1" />
                            </g>
                        </svg>
                    </button>
                </form>
                {(this.state.products && this.state.products.length > 0 && !this.props.hideContainerBar) ? <ul>{this.state.products.map((product: ProductSearchBar) => (
                    <li>
                        <a href={product.href}>
                            <div className="image-container">
                                {product.thumb && product.thumb.trim() ? (<img src={DomService.getImagePath(product.thumb).replace(/25\-25/, "80-80")} alt="" />) : ""}
                            </div>
                            <div className="product-name">
                                {product.name}
                            </div>
                        </a>
                    </li>
                ))}</ul> : ""}
            </div>
        );
    }
}


