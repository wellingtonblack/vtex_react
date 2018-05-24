import React from "react";
// tslint:disable-next-line:no-var-requires
import "./login-bar.component.scss";
import { LoginProps, LoginState } from "./login.model";
import { DataUserService } from "../../../../services/data-user.service";

declare const vtexid: any;

export class LoginBarComponent extends React.Component<LoginProps, LoginState> {
    
    public window: any = window as any;
    
    constructor(props: LoginProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);

        window.addEventListener("login", (event: CustomEvent) => {
            vtexid.start({
                returnUrl: "/",
                locale: "pt-BR",
            });
        }, false);
    }

    public handleLogin() {
        if (this.props.user && this.props.user.IsUserDefined) {
            (window as any).loading(true);
            DataUserService.logout()
                .then(() => {
                    this.window.location.reload();
                }, () => {
                    this.window.location.reload();
                });
        } else {
            window.scrollTo(0, 0);
            vtexid.start({
                returnUrl: "/",
                locale: "pt-BR",
            });
        }
    }

    public render() {
        return (
            <div className="login-bar" onClick={this.handleLogin}>
                <span className={`label`}>
                    {(this.props.user && this.props.user.IsUserDefined) ? "Sair" : "Entrar"}
                </span>
                <svg x="0px" y="0px" viewBox="0 0 18 18" className={`icon-header`}><g><path d="M13.456,16.617H4.745l2.389-8.674C6.36,7.34,5.893,6.401,5.893,5.409 c0-1.769,1.438-3.208,3.207-3.208c1.77,0,3.209,1.439,3.209,3.208c0,0.992-0.468,1.932-1.241,2.535L13.456,16.617z M6.058,15.617 h6.086L9.908,7.5l0.326-0.195c0.673-0.403,1.074-1.112,1.074-1.896c0-1.217-0.991-2.208-2.209-2.208 c-1.217,0-2.207,0.991-2.207,2.208c0,0.784,0.402,1.493,1.074,1.896L8.293,7.5L6.058,15.617z" /></g>
                </svg>
            </div>

        );
    }
}