import * as React from "react";
import { INavigationProps, INavigationState } from "./inavigation.model";

import "./navigation-bar-mobile.component.scss";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SearchListComponent } from "./component/search-list/search-list.component";
import { Sibling, ItemModel } from "../shared/item.model";

export class NavigationBarMobile extends React.Component<INavigationProps, INavigationState> {

    /**
     *
     */
    constructor(props: INavigationProps) {
        super(props);
        this.state = {
            items: this.props.items,
        };
        this.getSiblings = this.getSiblings.bind(this);

        
    }

    public  componentDidMount() {
        if (this.props.show) {
            document.querySelector("body").classList.add("navopen");
        } else {
            document.querySelector("body").classList.remove("navopen");
        }
    }

    public componentDidUpdate(nextProps: INavigationProps, nextState: INavigationState) {
        if (this.props.show) {
            document.querySelector("body").classList.add("navopen");
        } else {
            document.querySelector("body").classList.remove("navopen");
        }
    }

    public getSiblings(siblings: Sibling[], parent: ItemModel): any {
        return siblings.map((item, index) => {
            return (
                <ul className={`submenu`}>
                    {(index === 0) ? <li className="back-menu" onClick={this.onClickInactive.bind(this, parent)}>voltar</li> : ""}
                    {(item.name) ? <li className="title-subnav">{item.name}</li> : ""}
                    {item.items.map(((subitem) => {
                        return (
                            <li className={`item-nav ${subitem.isVisibleMob ? "active" : "inactive"}`}
                                onClick={this.onClick.bind(this, subitem)} >
                                <a className={`${subitem.highlighted ? "highlighted" : ""}`} href={(subitem.siblings && subitem.siblings.length > 0) ? "#" : subitem.link}>
                                    <span>{subitem.name}</span>
                                </a>
                                {(subitem.siblings && subitem.siblings.length > 0) ? (
                                    <i className="icon-arrow">
                                        <svg viewBox="0 0 129 129" enable-background="new 0 0 129 129">
                                            <g className="">
                                                <path className="path-icon " d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                            </g>
                                        </svg>
                                    </i>)
                                    : ""}
                                {subitem.siblings && subitem.siblings.length > 0 ? <div className="siblings">{this.getSiblings(subitem.siblings, subitem)}</div> : ""}
                            </li>
                        );
                    }))}
                    {parent.siblings.length > 0 ? <li className="item-nav"><a href={parent.link}>Ver todos</a></li> : ""}
                </ul>
            );
        });
    }

    public onClick(item: ItemModel, event: Event) {
        if (item.siblings.length > 0) {
            event.stopPropagation();
            item.isVisibleMob = true;
            this.setState({
                items: this.state.items,
            });
        }
    }

    public onClickInactive(item: ItemModel, event: Event) {
        event.stopPropagation();
        item.isVisibleMob = false;
        this.setState({
            items: this.state.items,
        });
    }

    public render() {

        return (
            <div id="navigation-bar-component-mobile" className={`${(this.props.show) ? "active" : "inactive"}`}>
                <div className="header-bar-navigation">
                    <SearchBarComponent hideContainerBar={true} handleClear={() => { this.setState({ searchProducts: null }); }} handleSearch={(products) => {
                        this.setState({
                            searchProducts: products,
                        });
                    }} />
                    <div className="close-navigation" onClick={this.props.handleClose}>
                        <span>X</span>
                    </div>
                </div>
                {(this.state.searchProducts) ? (
                    <div className="content-search-navigator">
                        <SearchListComponent products={this.state.searchProducts} />
                    </div>
                ) : (
                        <div className="content-navigation">
                            <ul className="menu">
                                {
                                    this.state.items.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={`${(item.isVisibleMob) ? "active" : "inactive"} item-nav`}
                                                onClick={this.onClick.bind(this, item)}>
                                                <a className={`link-menu ${item.highlighted ? "highlighted" : ""}`} href={(item.siblings && item.siblings.length > 0) ? "#" : item.link}>{item.name}</a>
                                                {(item.siblings && item.siblings.length > 0) ? (
                                                    <i className="icon-arrow">
                                                        <svg viewBox="0 0 129 129" enable-background="new 0 0 129 129">
                                                            <g className="">
                                                                <path className="path-icon " d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                                            </g>
                                                        </svg>
                                                    </i>)
                                                    : ""}
                                                {(item.siblings && item.siblings.length > 0) ? this.getSiblings(item.siblings, item) : ""}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                            <div className="user-enter">
                                {this.props.user && this.props.user.IsUserDefined ? (
                                    <div className="autenticado-mobile welcome-user">
                                        <div className="orders item-nav">
                                            <a href="/_secure/Account/Orders/#/">Meus Pedidos</a>
                                        </div>
                                        <div className="dados item-nav">
                                            <a href="/_secure/Account/">Meus Dados</a>
                                        </div>
                                        <div className="logout item-nav">
                                            <a className="meus-dados-logout" href="/logout">Sair</a>
                                        </div>
                                    </div>
                                ) : (
                                        <div className={"item-nav"} onClick={() => {
                                            window.dispatchEvent(new CustomEvent("login"));
                                        }}>Entrar</div>
                                    )}

                            </div>
                        </div>
                    )}


            </div>
        );
    }
}