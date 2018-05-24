import React from "react";
import { FormValidate } from "../../../../models/iform-validate";
import { DataNewsletterService } from "../../../../services/data-newsletter.service";


declare const vtexid: any;

export interface NewsletterProps {

}

export interface NewsletterState extends FormValidate {
    email: string;
    emailValid: boolean;
}

export class NewsletterComponent extends React.Component<NewsletterProps, NewsletterState> {

    public window: any = window as any;

    constructor(props: NewsletterProps) {
        super(props);

        this.state = {
            email: "",
            emailValid: false,
            formErrors: {
                emailValid: "",
            },
            formValid: false,
            isSubmit: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);

    }

    public handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        }, () => { this.validateField(name, value); });
    }

    public validateForm() {
        this.setState({ formValid: this.state.emailValid });
    }

    public validateField(fieldName: string, value: string) {
        const fieldValidationErrors = this.state.formErrors;

        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case "email":
                if (value === "" || value === null || value === undefined) {
                    emailValid = false;
                    fieldValidationErrors.emailValid = "Campo obrigatório!";
                } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                    emailValid = false;
                    fieldValidationErrors.emailValid = "Email inválido!";
                } else {
                    emailValid = true;
                }
                break;
            default:
                break;
        }

        this.setState({
            emailValid,
            formErrors: fieldValidationErrors,
        }, this.validateForm);
    }

    public render() {
        return (
            <form className="newsletter-component" autoComplete={false as any} onSubmit={(e) => {
                e.preventDefault();
                if (this.state.formValid) {
                    (window as any).loading(true);
                    DataNewsletterService.register(this.state.email)
                        .then((data) => {
                            (window as any).loading(false);
                        }, () => {
                            (window as any).loading(false);
                        });
                }
            }}>
                <div className="opening">
                    <i className="icon-mail"></i>
                    <h2>Newsletter</h2>
                    <i className="plus-mob"><svg width="20" viewBox="0 0 100 100">
                        <polygon fill="#010101" points="80.2,51.6 51.4,51.6 51.4,22.6 48.9,22.6 48.9,51.6 19.9,51.6 19.9,54.1 48.9,54.1 48.9,83.1 51.4,83.1 51.4,54.1 80.4,54.1 80.4,51.6"
                        />
                    </svg></i>
                </div>
                <ul className="newsletter expanded">
                    <div className="form-wrap">
                        <input className="input-nowrap input-int" name="email" type="text" placeholder="Digite seu e-mail aqui" onChange={this.handleInputChange} value={this.state.email} />
                        {!this.state.emailValid ? <span className="error">{this.state.formErrors.emailValid}</span> : ""}
                        <i className="icon icon-arrow_go"></i>
                    </div>
                    <div className="button-wrap">
                        <button type="submit" className="btn whiteColor">Enviar</button>
                    </div>
                </ul>
            </form>
        );
    }
}