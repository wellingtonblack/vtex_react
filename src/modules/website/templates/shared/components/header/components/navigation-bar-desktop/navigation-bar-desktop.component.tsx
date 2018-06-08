import * as React from "react";
import { INavigationProps, INavigationState } from "../shared/inavigation.model";
import { ItemModel, Sibling } from "../shared/item.model";
import "./navigation-bar-desktop.component.scss";


export class NavigationBarDesktop extends React.Component<INavigationProps, INavigationState> {

    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.state = {
            items: this.props.items,
        };

        window.addEventListener("change.color", (e: CustomEvent) => {
            this.setState({
                changeColor: e.detail,
            });
        });

        this.getSiblings = this.getSiblings.bind(this);
    }


    public hoverNavigation(item: ItemModel, inVisible: boolean, parent: ItemModel, event: any) {


        if (parent.siblings) {
            parent.siblings.forEach((sibling) => {
                sibling.items.forEach((_item: ItemModel) => {
                    _item.isVisible = false;
                });
            });
        }

        item.isVisible = inVisible;

        this.setState({
            items: this.state.items,
        });
    }

    public getSiblings(siblings: Sibling[], parent?: ItemModel, isBanner: boolean = false): any {
        const list = [];
        list.push(siblings.map((item) => {
            return (
                <ul className={`${(parent.isVisible) ? "active" : "inactive"} submenu ref-nav`}>

                    {(item.name) ? <li className="ref-nav title-subnav">{item.name}</li> : ""}
                    {item.items.map(((subitem) => {
                        return (
                            <li
                                className={`item-nav ref-nav`}
                                onMouseOver={this.hoverNavigation.bind(this, subitem, true, parent)}>
                                <a className={`ref-nav active item-subnav ${subitem.isVisible ? "hover-custom" : ""} ${subitem.highlighted ? "highlighted" : ""}`} href={subitem.link}>{subitem.name}</a>
                                {(subitem.siblings && subitem.siblings.length > 0) ? <i className="icon-arrow ref-nav">
                                    <svg className="ref-nav" viewBox="0 0 129 129" enable-background="new 0 0 129 129">
                                        <g className="ref-nav">
                                            <path className="path-icon ref-nav" d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                        </g>
                                    </svg></i> : ""}
                            </li>
                        );
                    }))}

                </ul>
            );
        }));

        list.push(siblings.map((item) => item.items.map(((subitem) => (subitem.siblings && subitem.siblings.length > 0) ? this.getSiblings(subitem.siblings, subitem) : ""))));

        return list;
    }

    public mouseOut($event: React.MouseEvent<HTMLLIElement>) {
        if (!(($event.relatedTarget as any).classList.contains("ref-nav") || ($event.relatedTarget as any).classList.contains("text-center"))) {
            this.state.items.forEach((_item) => {
                _item.isVisible = false;
            });
            this.setState({
                items: this.state.items,
            });

        }
    }


    public render() {

        return (
            <div id="navigation-bar-component-desktop" className="ref-nav">
                <ul className="menu ref-nav">
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onMouseOver={() => {
                                        this.state.items.forEach((_item) => {
                                            _item.isVisible = false;
                                        });
                                        item.isVisible = true;
                                        this.setState({
                                            items: this.state.items,
                                        });
                                    }}
                                    onMouseOut={this.mouseOut.bind(this)}
                                    className={`ref-nav ${(item.isVisible) ? "active-link" : ""}`}>
                                    <a className={`ref-nav text-uppercase ${item.highlighted ? "highlighted" : ""}`} href={item.link}>{item.name}</a>
                                </li>
                            );
                        })
                    }
                </ul>

                <ul className={`wrapper-subnav ref-nav`} onMouseOut={this.mouseOut.bind(this)}>
                    {
                        this.state.items.map((item, index) => {
                            return ((item.siblings && item.siblings.length > 0) || (item.banners && item.banners.length > 0)) ? (
                                <li style={{ backgroundColor: this.state.changeColor, minWidth: item.size }} className={`${(item.isVisible) ? "active" : "inactive"} firstNav ref-nav`}>
                                    {(item.siblings && item.siblings.length > 0) ? this.getSiblings(item.siblings, item, true) : ""}
                                    {(item.banners && item.banners.length > 0) ? (
                                        <div className="wrapper-banners">
                                            {item.banners.map((banner) => <div className="banner ref-nav"><a href={banner.href}><img src={`/arquivos/${banner.src}`} alt="" className="ref-nav" /></a></div>)}
                                        </div>
                                    ) : ""}
                                </li>
                            ) : "";
                        })
                    }
                </ul>

            </div>
        );
    }
}