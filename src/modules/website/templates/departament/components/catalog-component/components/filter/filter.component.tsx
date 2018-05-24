import * as React from "react";
import { FilterState, FilterProps } from "./models/filter.model";
import { FilterService } from "./services/data-filter.service";
import { CheckboxButton } from "./shared/checkbox-button/checkbox-button.component";
import { PathModel } from "../../models/path.model";
import "./filter.component.scss";



export class FilterComponent extends React.Component<FilterProps, FilterState> {

    /**
     *
     */
    constructor(props: FilterProps) {
        super(props);

        this.state = {
            filter: null,
            filters: [],
            filterPath: this.buildSearchUri(this.props.params),
            filterOpen: false,
        };

        FilterService.getFilter(this.state.filterPath)
            .then((data) => {
                this.setState({
                    filter: data,
                });
            });
    }

    public buildSearchUri(params: PathModel) {
        let path = "";
        let categorySlug = "";
        params.categories.forEach((category: any, index: number) => {
            path += `/${category.categoryName}`;

            if ((index + 1) < params.categories.length) {
                categorySlug += "c,";
            } else {
                categorySlug += "c";
            }
        });

        let brandSlug = "";
        params.brands.forEach((brand: any, index: number) => {
            path += `/${brand.brandName}`;

            if ((index + 1) < params.brands.length) {
                brandSlug += "b,";
            } else {
                brandSlug += "b";
            }
        });

        return `${(path) ? `${path}?map=${categorySlug}${(brandSlug) ? `,${brandSlug}` : ""}` : `${params.searchTerm}?map=c`}`;
    }

    public getValue(path: string) {
        const element = document.createElement("a");
        element.href = path;
        const pathArray = element.pathname.split(/\//);
        const match = path.match(/specificationFilter\_\d+/);
        return `fq=${match[0]}:${pathArray[pathArray.length - 1]}`;
    }

    public isInner(label: string): boolean {

        label = label.toLocaleLowerCase();

        if (label === "tamanho") {
            return true;
        }

        return false;
    }

    public render() {
        return (
            <div className="filter-component">
                <div className={`row no-gutters `}>
                    {(this.state.filter) ? (
                        <div className={`${(this.state.filterOpen) ? "active" : "inactive"} filter-wrapper`}>
                            <div className="filter-title-aside">
                                <h3 className="first-title-filter">Filtrar por:</h3>
                            </div>
                            <div className="filters-wrapper">
                                {this.state.filter.CategoriesTrees.map((department) => {
                                    return (
                                        <div className="filter-aside">
                                            <h3 className="filter-title">{this.state.filter.CategoriesTrees.length > 1 ? department.Name : "Tipo"}</h3>
                                            {(department.Children) ? (
                                                <ul>
                                                    {department.Children.map((category, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <a href={category.Link}>
                                                                    <CheckboxButton
                                                                        status={false}
                                                                        value="teste">
                                                                        {category.Name}
                                                                        <small> ({category.Quantity})</small>
                                                                    </CheckboxButton>
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            ) : ""}
                                        </div>
                                    );
                                })}
                                {Object.keys(this.state.filter.SpecificationFilters).map((filterName) => {
                                    return (
                                        ((filterName.toLocaleLowerCase() !== "gênero" && 
                                          filterName.toLocaleLowerCase() !== "modelador" && 
                                          filterName.toLocaleLowerCase() !== "promoção") ? (
                                            <div className="filter-aside">
                                                <h3 className="filter-title">{filterName}</h3>
                                                <ul className={`${(this.isInner(filterName) || (filterName.toLocaleLowerCase() === "cor")) ? "filter-column" : ""}`}>
                                                    {this.state.filter.SpecificationFilters[filterName].map((specification: any, index: number) => {
                                                        return (
                                                            <li key={index}>
                                                                <CheckboxButton
                                                                    color={(filterName.toLocaleLowerCase() === "cor") ? specification.Name : null}
                                                                    innerContent={this.isInner(filterName)}
                                                                    status={false}
                                                                    handleCheck={(value: string, state: boolean) => {
                                                                        if (state) {
                                                                            this.state.filters.push(value);
                                                                        } else {
                                                                            const idx = this.state.filters.indexOf(value);
                                                                            if (idx > -1) {
                                                                                this.state.filters.splice(idx, 1);
                                                                            }
                                                                        }
                                                                        this.setState({
                                                                            filters: this.state.filters,
                                                                        }, () => {
                                                                            this.props.handleSearchSpecification(this.state.filters);
                                                                        });
                                                                    }}
                                                                    value={this.getValue(specification.Link)}>
                                                                    {specification.Name}
                                                                </CheckboxButton>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        ) : "")
                                    );
                                })}
                            </div>
                            <div className="hidden-lg filter-control-wrapper">
                                <button onClick={() => { this.setState({ filterOpen: false }); }} className="button-filter apply">Aplicar</button>
                                <button className="button-filter cancel" onClick={() => {
                                    this.setState({
                                        filters: [],
                                    }, () => {
                                        this.props.handleSearchSpecification(this.state.filters);
                                        this.setState({
                                            filterOpen: false,
                                        });
                                    });
                                }}>Cancelar</button>
                            </div>
                        </div>
                    ) : ""}

                    {(this.state.filter) ? (
                        <div className="hidden-lg filter-control-wrapper">
                            <button onClick={() => { this.setState({ filterOpen: true }); }} className="button-filter filter">Filtrar</button>
                            {this.props.children}
                        </div>
                    ) : ""}
                </div>
            </div>
        );
    }
}
