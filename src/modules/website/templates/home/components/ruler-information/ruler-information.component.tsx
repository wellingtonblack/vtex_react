import React, { Component } from "react";
import "./ruler-information.component.scss";


export class RulerInformation extends Component {
    public render() {
        return (
            <section className="ruler-information-component container-fluid wrapper space-bottom">

                <div className="call-information">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col call-text">
                                <h3 className="col no-padding fst">Frete grátis</h3>
                                <span className="col no-padding text-small">para compra acima de R$ 250,00
                                </span>
                            </div>
                            <div className="col call-text">
                                <h3 className="col no-padding text-larger">30</h3>
                                <span className="col no-padding text-medium">dias para troca
                                </span>
                            </div>
                            <div className="col call-text">
                                <h3 className="col no-padding text-larger">1ª</h3>
                                <span className="col no-padding text-medium">Troca Grátis
                                </span>
                            </div>
                            <div className="col call-text">
                                <h3 className="col no-padding text-larger">6X</h3>
                                <span className="col no-padding text-medium">Sem juros no cartão
                                </span>
                            </div>
                            <div className="col call-text">
                                <h3 className="col">
                                    <svg x="0px" y="0px" width="21.7px" height="28px" viewBox="0 0 21.7 28"> <style type="text/css"></style>
                                        <defs>
                                        </defs>
                                        <g>
                                            <g>
                                                <path fill="#749AAA;" d="M21.7,28H0V11.9h21.7V28z M2,26h17.7V13.9H2V26z" />
                                            </g>
                                            <g>
                                                <path fill="#749AAA;" d="M18.3,12.9h-2V7.4c0-3-2.4-5.4-5.4-5.4c-3,0-5.4,2.4-5.4,5.4v5.5h-2V7.4C3.5,3.3,6.8,0,10.9,0 s7.4,3.3,7.4,7.4V12.9z" />
                                            </g>
                                            <g>
                                                <polygon fill="#749AAA;" points="9.7,23.3 6.7,20.7 8.1,19.2 9.6,20.6 14.1,16.4 15.5,17.9 		" />
                                            </g>
                                        </g>
                                    </svg>
                                </h3>
                                <span className="col no-padding text-medium">Compra segura
                                </span>
                            </div>
                            <div className="col call-text">
                                <h3 className="col no-padding">Fale conosco
                                </h3>
                                <span className="col no-padding text-small">seg à sexta <br /> 8:00 às 17:00 h sac@intimissimi.com.br
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}