import * as React from "react";
import { NavigationBarDesktop } from "../navigation-bar-desktop/navigation-bar-desktop.component";
import { NavigationBarMobile } from "../navigation-bar-mobile/navigation-bar-mobile.component";
import { HeaderProps, HeaderState } from "./header.model";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { WhishListBarcomponent } from "../whishlist-bar/whishlist-bar.component";
import { LoginBarComponent } from "../login-bar/login-bar.component";
import { ButtonNavComponent } from "../navigation-bar-mobile/component/button-nav-mob/button-navcomponent";
import { CartBarComponent } from "../cart-bar/cart-bar.component";
import { LoadbarComponent } from "../../../load-bar/load-bar.component";
import { DataUserService } from "../../../../services/data-user.service";
import { DataWishlistService } from "../../../../services/data-wishlist.service";
import { MiniCartComponent } from "../mini-cart/mini-cart.component";
import "./header.component.scss";

declare const screen: any;
declare const $: any;
export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {

    /**
     *
     */
    constructor(props: any) {
        super(props);

        this.state = {
            numberOfProducts: 0,
            openMobNav: false,
            orderForm: null,
        };

        window.addEventListener("change.color", (e: CustomEvent) => {
            this.setState({
                headerColor: e.detail,
            }, () => {
                document.querySelector(".header").setAttribute("style", `background-color:${this.state.headerColor}`);
            });
        });

        window.onresize = (event) => {
            this.forceUpdate();
        };

        DataUserService.getCurrentUser()
            .then((user) => {
                if (user) {
                    this.setState({
                        user,
                    }, () => {
                        if (this.state.user && this.state.user.Email) {

                            DataUserService.setUser(this.state.user);
                            window.dispatchEvent(new CustomEvent("user.load", { detail: this.state.user }));

                            (window as any).loading(true);
                            DataWishlistService.getProducts(this.state.user.Email)
                                .then((data) => {
                                    (window as any).loading(false);
                                    if (data.length > 0) {
                                        this.setState({
                                            numberOfProducts: data.length,
                                        }, () => {
                                            window.dispatchEvent(new CustomEvent("update.wishlist", { detail: data }));
                                        });
                                    }
                                }, () => {
                                    (window as any).loading(false);
                                });
                        }
                    });
                }
            });

        window.addEventListener("load.wishlist", (event: Event) => {

            (window as any).loading(true);
            DataWishlistService.getProducts(this.state.user.Email)
                .then((data) => {
                    (window as any).loading(false);
                    if (data.length > 0) {
                        this.setState({
                            numberOfProducts: data.length,
                        }, () => {
                            window.dispatchEvent(new CustomEvent("update.wishlist", { detail: data }));
                        });
                    }
                });
        }, false);
    }
    
    public render() {

        const style: any = {};
        if (this.state.headerColor) {
            style.backgroundColor = this.state.headerColor;
        }

        return (
            <div style={style} className={`${(this.state.headerColor) ? "line-header-dark reset-header-space" : ""} header-component`}>
                <nav className="header-component container-fluid wrapper">
                    <LoadbarComponent />
                    <MiniCartComponent handleUpdate={(orderForm) => { this.setState({ orderForm }); }} />
                    <div className="row header-container">
                        {($(window).width() < 992) ? <div className="header-left-mobile col-sm-4">
                            <ButtonNavComponent
                                handleOpen={(state) => { this.setState({ openMobNav: state }); }}
                                open={this.state.openMobNav} />

                            <NavigationBarMobile
                                handleClose={() => {
                                    this.setState({
                                        openMobNav: false,
                                    });
                                }}
                                show={this.state.openMobNav}
                                items={this.props.items}
                                user={this.state.user} />
                        </div> : ""}
                        <div className="header-left col-sm-4">
                            <div className="institucional">
                                <p className="nossas-lojas-menu">
                                    <a href="/lojas">
                                        encontre uma loja
                            </a>
                                </p>
                                <span className="text-center">|</span>
                                <p className="franqueado-menu">
                                    <a href="/institucional/franquias">
                                        seja um franqueado
                            </a>
                                </p>
                            </div>
                            <i className="icon icon-menu visible-xs visible-sm" data-toggle="nav-menu-mobile"></i>
                        </div>

                        <div className="header-center col-sm-4">
                            <a href="http://www.intimissimi.com.br" className="logo-link">Intimissimi
                        <i><svg className="logo" viewBox="0 0 173.5 37.4" ><title>www.intimissimi.com.br</title> <defs> </defs> <g id="logo_2_copy"> <g> <g> <path d="M173.5,37.4H0V0h173.5V37.4z M0.5,36.9h172.6V0.5H0.5V36.9z" /> </g> <g> <polygon points="12.1,25.3 12.1,15.3 13.4,15.3 13.4,25.3 12.1,25.3 " /> <path d="M14,25.9h-2.5V14.7H14V25.9z M12.7,24.7L12.7,24.7l0.1-8.8h-0.1V24.7z" /> </g> <g> <path d="M29.5,25.3v-6.2c0-1.9-1.2-3-3.3-3c-2.1,0-3.4,1.1-3.4,3v6.2h-1.3V15.3h1.3v1.2c0.9-0.9,2.1-1.3,3.5-1.3 c1.3,0,2.4,0.3,3.2,1c0.8,0.6,1.2,1.6,1.2,2.8v6.4H29.5L29.5,25.3z" /> <path d="M31.4,25.9h-2.5v-6.8c0-1.6-0.9-2.4-2.7-2.4c-1.3,0-2.8,0.4-2.8,2.4v6.8H21V14.7h2.5v0.6c0.8-0.5,1.8-0.7,2.9-0.7 c1.5,0,2.7,0.4,3.6,1.1c1,0.8,1.5,1.9,1.5,3.3V25.9z M30.1,24.7L30.1,24.7l0.1-5.8c0-0.8-0.2-1.4-0.6-1.9 c0.4,0.6,0.6,1.3,0.6,2.1V24.7z M22.2,24.7L22.2,24.7l0.1-5.6c0-0.5,0.1-1,0.3-1.5l-0.3,0.2v-2h-0.1V24.7z" /> </g> <g> <path d="M42,25.3c-1.9,0-2.9-1.1-2.9-2.6v-6.6h-1.6v-0.8h1.6v-3.2h1.3v3.2h2.7v0.8h-2.7v6.7c0,1,0.6,1.7,1.8,1.7h0.9v0.9H42 L42,25.3z" /> <path d="M43.7,25.9H42c-2.1,0-3.5-1.3-3.5-3.2v-6h-1.6v-2h1.6v-3.2H41v3.2h2.7v2H41v6c0,0.6,0.1,1.1,1.2,1.1h1.5V25.9z M39.7,15.5v7.2c0,0.5,0.1,0.8,0.3,1.2c-0.2-0.3-0.2-0.7-0.2-1.1V12.7h-0.1V15.5z" /> </g> <g> <polygon points="50.2,25.3 50.2,15.3 51.5,15.3 51.5,25.3 50.2,25.3 " /> <path d="M52.1,25.9h-2.5V14.7h2.5V25.9z M50.8,24.7L50.8,24.7l0.1-8.8h-0.1V24.7z" /> </g> <g> <path d="M75.6,25.3v-6.2c0-1.9-1.2-3-3.3-3c-2.1,0-3.4,1.1-3.4,2.8v6.4h-1.3v-6.2c0-1.9-1.2-3-3.3-3c-2.1,0-3.4,1.1-3.4,3v6.2 h-1.3V15.3h1.3v1.2c0.9-0.9,2.1-1.3,3.6-1.3c1.8,0,3.1,0.6,3.8,1.8c0.9-1.2,2.3-1.8,4.1-1.8c1.3,0,2.4,0.4,3.2,1 c0.8,0.6,1.2,1.6,1.2,2.8v6.4H75.6L75.6,25.3z" /> <path d="M77.4,25.9H75v-6.8c0-1.6-0.9-2.4-2.7-2.4c-1.7,0-2.8,0.8-2.8,2.2v7H67v-6.8c0-1.6-0.9-2.4-2.7-2.4 c-1.3,0-2.8,0.4-2.8,2.4v6.8h-2.5V14.7h2.5v0.6c0.8-0.5,1.8-0.7,3-0.7c1.7,0,3,0.5,3.9,1.5c1-1,2.4-1.5,4-1.5 c1.4,0,2.7,0.4,3.5,1.1c1,0.8,1.5,1.9,1.5,3.3V25.9z M76.2,24.7L76.2,24.7l0-5.8c0-0.7-0.2-1.3-0.5-1.8c0.3,0.5,0.5,1.2,0.5,1.9 V24.7z M68.2,24.7L68.2,24.7l0.1-5.8c0-0.4,0.1-0.7,0.2-1l-0.2,0.2l-0.4-0.6c0.2,0.5,0.3,1,0.3,1.7V24.7z M60.3,24.7L60.3,24.7 l0.1-5.6c0-0.5,0.1-1,0.3-1.4l-0.3,0.2v-2h-0.1V24.7z" /> </g> <g> <polygon points="84.8,25.3 84.8,15.3 86.1,15.3 86.1,25.3 84.8,25.3 " /> <path d="M86.7,25.9h-2.5V14.7h2.5V25.9z M85.4,24.7L85.4,24.7l0.1-8.8h-0.1V24.7z" /> </g> <g> <path d="M98,25.5c-2.1,0-3.6-0.5-4.8-1.4l0.9-0.7c0.9,0.8,2.2,1.2,3.9,1.2c2.3,0,3.6-0.7,3.6-2c0-1-0.7-1.6-2.3-1.7l-2-0.2 c-2.4-0.2-3.6-1.1-3.6-2.6c0-1.7,1.7-2.9,4.3-2.9c1.6,0,3.2,0.4,4.2,1.1l-0.8,0.7c-0.9-0.6-2-0.8-3.4-0.8c-2,0-3.1,0.7-3.1,1.9 c0,1,0.7,1.6,2.4,1.7l1.9,0.1c2,0.1,3.5,0.7,3.5,2.6C102.8,24.3,100.9,25.5,98,25.5L98,25.5z" /> <path d="M98,26.1c-2.2,0-3.9-0.5-5.2-1.6L92.2,24l1.8-1.5l0.4,0.3c0.8,0.7,2,1.1,3.5,1.1c1.4,0,3-0.3,3-1.4c0-0.4,0-0.9-1.7-1.1 l-2-0.2C93.8,21,93,19.4,93,18c0-2.1,2-3.5,4.9-3.5c1.7,0,3.4,0.4,4.5,1.2l0.7,0.4l-1.8,1.5l-0.4-0.2c-0.8-0.5-1.9-0.8-3-0.8 c-0.9,0-2.5,0.2-2.5,1.3c0,0.3,0,1,1.9,1.1l1.9,0.1c1.1,0.1,4.1,0.3,4.1,3.2C103.4,24.6,101.2,26.1,98,26.1z M101.8,21.3 c0.2,0.3,0.3,0.7,0.3,1.2c0,0.2,0,0.5-0.1,0.7c0.1-0.2,0.1-0.5,0.1-0.7C102.2,22,102.1,21.6,101.8,21.3z M94.4,17.3 c-0.1,0.2-0.1,0.4-0.1,0.7c0,0.2,0,0.5,0.2,0.8c-0.1-0.2-0.1-0.5-0.1-0.8C94.3,17.8,94.3,17.6,94.4,17.3z" /> </g> <g> <path d="M113.6,25.5c-2.1,0-3.6-0.5-4.8-1.4l0.9-0.7c0.9,0.8,2.2,1.2,3.9,1.2c2.3,0,3.6-0.7,3.6-2c0-1-0.7-1.6-2.3-1.7l-2-0.2 c-2.4-0.2-3.6-1.1-3.6-2.6c0-1.7,1.7-2.9,4.3-2.9c1.6,0,3.2,0.4,4.2,1.1l-0.9,0.7c-0.9-0.6-2-0.8-3.4-0.8c-2,0-3.1,0.7-3.1,1.9 c0,1,0.7,1.6,2.4,1.7l1.9,0.1c2,0.1,3.5,0.7,3.5,2.6C118.4,24.3,116.5,25.5,113.6,25.5L113.6,25.5z" /> <path d="M113.6,26.1c-2.2,0-3.9-0.5-5.2-1.6l-0.6-0.5l1.8-1.5l0.4,0.3c0.8,0.7,2,1.1,3.5,1.1c1.4,0,3-0.3,3-1.4 c0-0.4,0-0.9-1.7-1.1l-2-0.2c-3.4-0.2-4.2-1.9-4.2-3.2c0-2.1,1.9-3.5,4.9-3.5c1.7,0,3.4,0.4,4.5,1.2l0.7,0.4l-1.8,1.5l-0.4-0.2 c-0.8-0.5-1.8-0.8-3-0.8c-0.9,0-2.4,0.2-2.4,1.3c0,0.4,0,1,1.9,1.1l1.9,0.1c1.1,0.1,4.1,0.3,4.1,3.2 C119,24.6,116.9,26.1,113.6,26.1z M117.4,21.3c0.2,0.3,0.3,0.7,0.3,1.2c0,0.2,0,0.5-0.1,0.7c0.1-0.2,0.1-0.5,0.1-0.7 C117.8,22,117.7,21.6,117.4,21.3z M110,17.3c-0.1,0.2-0.1,0.4-0.1,0.7c0,0.2,0,0.5,0.2,0.8c-0.1-0.2-0.1-0.5-0.1-0.8 C109.9,17.8,109.9,17.6,110,17.3z" /> </g> <g> <polygon points="125.5,25.3 125.5,15.3 126.8,15.3 126.8,25.3 125.5,25.3 " /> <path d="M127.4,25.9h-2.5V14.7h2.5V25.9z M126.2,24.7L126.2,24.7l0.1-8.8h-0.1V24.7z" /> </g> <g> <path d="M150.9,25.3v-6.2c0-1.9-1.2-3-3.3-3c-2.1,0-3.4,1.1-3.4,2.8v6.4h-1.3v-6.2c0-1.9-1.2-3-3.3-3c-2.1,0-3.4,1.1-3.4,3v6.2 H135V15.3h1.3v1.2c0.9-0.9,2.1-1.3,3.6-1.3c1.8,0,3.1,0.6,3.9,1.8c0.9-1.2,2.3-1.8,4.1-1.8c1.3,0,2.4,0.4,3.2,1 c0.8,0.6,1.2,1.6,1.2,2.8v6.4H150.9L150.9,25.3z" /> <path d="M152.7,25.9h-2.4v-6.8c0-1.6-0.9-2.4-2.7-2.4c-1.7,0-2.8,0.8-2.8,2.2v7h-2.5v-6.8c0-1.6-0.9-2.4-2.7-2.4 c-1.3,0-2.8,0.4-2.8,2.4v6.8h-2.5V14.7h2.5v0.6c0.8-0.5,1.8-0.7,2.9-0.7c1.7,0,3,0.5,3.9,1.5c1-1,2.4-1.5,4-1.5 c1.4,0,2.7,0.4,3.5,1.1c1,0.8,1.5,1.9,1.5,3.3V25.9z M151.5,24.7L151.5,24.7l0-5.8c0-0.7-0.2-1.3-0.5-1.7 c0.3,0.5,0.5,1.2,0.5,1.9V24.7z M143.5,24.7L143.5,24.7l0.1-5.8c0-0.4,0.1-0.7,0.2-1l-0.2,0.2l-0.4-0.7c0.2,0.5,0.4,1.1,0.4,1.7 V24.7z M135.6,24.7L135.6,24.7l0.1-5.6c0-0.5,0.1-1,0.2-1.4l-0.2,0.2v-2h-0.1V24.7z" /> </g> <g> <polygon points="160.2,25.3 160.2,15.3 161.4,15.3 161.4,25.3 160.2,25.3 " /> <path d="M162,25.9h-2.5V14.7h2.5V25.9z M160.8,24.7L160.8,24.7l0.1-8.8h-0.1V24.7z" /> </g> </g> </g> </svg></i>
                            </a>
                        </div>

                        <div className="header-right wrapper-component col-sm-4">
                            {($(window).width() > 991) ? <SearchBarComponent /> : (
                                <svg onClick={() => { this.setState({ openMobNav: true }); }} className="icon-header" viewBox="0 0 18 18" enable-background="new 0 0 18 18">
                                    <g>
                                        <path fill="#010101" d="M7.043, 12.101c-2.738, 0-4.965-2.228-4.965-4.965c0-2.737, 2.227-4.964, 4.965-4.964s4.96, 2.227, 4.965, 4.964, C12.008, 9.873, 9.781, 12.101, 7.043, 12.101z M7.043, 3.171c-2.186, 0-3.965, 1.778-3.965, 3.964c0, 2.187, 1.779, 3.965, 3.965, 3.965, s3.965-1.779, 3.965-3.965C11.008, 4.95, 9.229, 3.171, 7.043, 3.171z" />
                                    </g>
                                    <g>
                                        <rect x="8.952" y="12.73" transform="matrix(0.7109 0.7033 -0.7033 0.7109 13.0759 -5.3506)" fill="#010101" width="8.188" height="1" />
                                    </g>
                                </svg>
                            )}
                            <WhishListBarcomponent numberOfProducts={this.state.numberOfProducts} />
                            <LoginBarComponent user={this.state.user} />
                            <CartBarComponent orderForm={this.state.orderForm} />
                        </div>

                    </div>

                    {($(window).width() > 991) ? <NavigationBarDesktop items={this.props.items} /> : ""}

                </nav>
            </div>);
    }
}