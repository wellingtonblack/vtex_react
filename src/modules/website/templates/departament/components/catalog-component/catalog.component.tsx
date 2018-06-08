import * as React from "react";
import { CatalogState, CatalogProps } from "./catalog.model";
import { PathModel } from "./models/path.model";
import { FilterComponent } from "./components/filter/filter.component";
import "./catalog.component.scss";
import { DataProductService } from "../../../shared/services/data-products.service";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { OrderByComponent } from "./components/order-by/order-by.component";
import { link } from "fs";

export class CatalogComponent extends React.Component<CatalogProps, CatalogState> {

    private offset: number = 15;
    private filterRef: FilterComponent;

    constructor(props: any) {
        super(props);
        const params = this.getSearchUrl();

        this.state = {
            from: 0,
            to: 14,
            filters: params.specifications,
            params,
            products: null,
            orderBy: params.orderBy || "OrderByReleaseDateDESC",
        };

        this.searchProducts();
    }

    public buildProductList(params: PathModel): string[] {
        const paths = [];

        if (params.categories.length > 0) {
            let categorypath = "fq=C:";
            for (let index = 0; index < params.categories.length; index++) {
                const category = params.categories[index];
                categorypath += `${category.categoryId}`;
                if (index < (params.categories.length - 1)) {
                    categorypath += "/";
                }
            }
            paths.push(categorypath);
        }

        if (params.brands.length > 0) {
            let brandpath = "fq=B:";
            for (let index = 0; index < params.brands.length; index++) {
                const brand = params.brands[index];
                brandpath += `${brand.brandId}`;
                if (index < (params.brands.length - 1)) {
                    brandpath += "/";
                }
            }
            paths.push(brandpath);
        }

        if (params.collections.length > 0) {
            let brandpath = "fq=H:";
            for (let index = 0; index < params.collections.length; index++) {
                const brand = params.collections[index];
                brandpath += `${brand.collectionId}`;
                if (index < (params.collections.length - 1)) {
                    brandpath += "/";
                }
            }
            paths.push(brandpath);
        }

        return paths.concat(this.state.filters);
    }

    public searchProducts() {
        (window as any).loading(true);
        DataProductService.getProductsByCategory(this.buildProductList(this.state.params), this.state.params.searchTerm, this.state.orderBy, 0, 15)
            .then((data) => {
                (window as any).loading(false);
                this.setState({
                    products: [],
                }, () => {
                    this.setState({
                        products: data,
                    }, () => {
                        window.dispatchEvent(new CustomEvent("load.wishlist"));
                    });

                });
            });
    }

    public seeMore() {
        (window as any).loading(true);
        this.setState({
            to: this.state.to + this.offset,
            from: this.state.to + 1,
        }, () => {
            DataProductService.getProductsByCategory(this.buildProductList(this.state.params), this.state.params.searchTerm, this.state.orderBy, this.state.from, this.state.to)
                .then((data) => {
                    (window as any).loading(false);
                    this.setState({
                        products: this.state.products.concat(data),
                    }, () => {
                        window.dispatchEvent(new CustomEvent("load.wishlist"));
                    });
                });
        });
    }

    public getSearchUrl() {
        let url: RegExpExecArray;
        let content = "";
        let preg: RegExp;

        $("script:not([src])").each(function() {
            content = $(this)[0].innerHTML;
            preg = /\/buscapagina\?.+&PageNumber=/i;
            if (content.search(/\/buscapagina\?/i) > -1) {
                url = preg.exec(content);
                return false;
            }
        });

        if (typeof (url) !== "undefined" && typeof (url[0]) !== "undefined") {


            const schema: PathModel = {
                categories: [],
                brands: [],
                collections: [],
                specifications: [],
                orderBy: "",
            };

            let offset = -1;
            url[0].split(/[\&\?]/g).forEach((param, index) => {

                param = decodeURIComponent(param);

                if (param.indexOf("fq=C") > -1) {
                    const categories = param.replace("fq=C:", "").match(/\d+/g);
                    categories.forEach((categoryId, _index) => {
                        schema.categories.push({
                            categoryId,
                            categoryName: window.location.pathname.replace("/", "").split(/\//)[_index],
                        });
                        offset++;
                    });
                }

                if (param.indexOf("ft=") > -1) {
                    schema.searchTerm = param.replace("ft=", "").replace(/\+/g, "%20");
                }

                if (param.indexOf("fq=B") > -1) {
                    schema.brands.push({ brandId: param.replace("fq=B:", ""), brandName: window.location.pathname.split(/\//)[index + offset] });
                }

                if (param.indexOf("fq=H") > -1) {
                    schema.collections.push({ collectionId: param.replace("fq=H:", "") });
                }

                if (param.indexOf("O=") > -1) {
                    schema.orderBy = param.replace("O=", "");
                }

                const filter = param.match(/specificationFilter\_\d.*/);
                if (filter && filter.length > 0) {
                    schema.specifications.push(`fq=${filter[0]}`);
                }
            });

            return schema;
        } else {
            throw new Error("Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]");
        }
    }

    public loading(state: boolean) {
        window.dispatchEvent(new CustomEvent("load.bar", { detail: state }));
    }

    public render() {
        return (
            <div className="container-fluid catalog-component">
                <div className="row no-gutters">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                        <FilterComponent
                            ref={(ref) => { this.filterRef = ref; }}
                            handleSearchSpecification={(filters) => {
                                filters = filters.concat(this.state.params.specifications);
                                this.setState({ filters }, () => { this.searchProducts(); });
                            }}
                            params={this.state.params}>
                            <OrderByComponent orderBy={this.state.orderBy} hidelabel={true} onChange={(orderBy) => { this.setState({ orderBy }, () => { this.searchProducts(); }); }} />
                        </FilterComponent>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-10">
                        {($(window).width() > 767) ? (<div className="row small-filter-desk">
                            <div className="filter-list">
                                <ul>
                                    {this.state.filters.map((filter) => <li onClick={this.filterRef && this.filterRef.handleFilterChange.bind(this, filter, true)}><span className="button-remove">X</span> {filter.replace(/fq=specificationFilter_\d+:/, "").replace(/\+|\%20/g, " ")}</li>)}
                                    {(this.state.filters.length > 0) ? <li className="clear-all-filter" onClick={this.filterRef && this.filterRef.clearFilter}>Limpar Tudo</li> : ""}
                                </ul>
                            </div>
                            <OrderByComponent orderBy={this.state.orderBy} onChange={(orderBy) => { this.setState({ orderBy }, () => { this.searchProducts(); }); }} />
                        </div>) : ""}
                        <ProductListComponent products={this.state.products} />
                        <div className="col-12 row no-gutters justify-content-center align-middle">
                            <button onClick={this.seeMore.bind(this)} className="button-see-more">+ver mais</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
