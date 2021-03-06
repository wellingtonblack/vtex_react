import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemModel } from "./components/shared/item.model";
import "./header.controller.scss";
import { HeaderComponent } from "./components/header-component/header.component";

declare var items: ItemModel[];


export class HeaderController {


    constructor() {
        let _items: ItemModel[] = [];

        if (typeof items === "undefined") {
            _items =  [
                {
                    banners: [
                        {
                            src: "Aba_Novidades_Preview.jpg",
                            href: "/primavera-verao",
                        },
                    ],
                    link: "/novidades/?O=OrderByReleaseDateDESC",
                    name: "Novidades",
                    siblings: [{
                        items: [{
                            link: "/vestuario/?O=OrderByReleaseDateDESC",
                            name: "Vestuário",
                        },
                        {
                            link: "/calcinhas/?O=OrderByReleaseDateDESC",
                            name: "Calcinhas",
                        },
                        {
                            link: "/sutias/?O=OrderByReleaseDateDESC",
                            name: "Sutiã",
                        },
                        {
                            link: "/noite/?O=OrderByReleaseDateDESC",
                            name: "Linha noite",
                        },
                        {
                            link: "/cuecas?O=OrderByReleaseDateDESC",
                            name: "Cuecas",
                        },
                        ],
                    }],
                },
                {
                    banners: [
                        {
                            src: "Banner_Aba_70_in_rome.jpg",
                            href: "/1260",
                        },
                        {
                            src: "Banner_Aba_colecao_Bellagio.jpg",
                            href: "/1258",
                        },
                    ],
                    link: "/novidades/?O=OrderByReleaseDateDESC",
                    name: "Coleção",

                },
                {
                    banners: [
                        {
                            src: "Aba_Sutias_Bra.gif",
                            href: "/sutias/?O=OrderByReleaseDateDESC",
                        },
                    ],
                    link: "/feminino",
                    size: "81%",
                    name: "Feminino",
                    siblings: [{
                        items: [{
                            link: "/sutias/?O=OrderByReleaseDateDESC",
                            name: "Sutiãs",
                            isVisible: true,
                            siblings: [{
                                items: [
                                    {
                                        link: "/sutias/balconet/?O=OrderByReleaseDateDESC",
                                        name: "Balconet",
                                    },
                                    {
                                        link: "/sutias/brallete/?O=OrderByReleaseDateDESC",
                                        name: "Brallete",
                                    },
                                    {
                                        link: "/sutias/push-up/?O=OrderByReleaseDateDESC",
                                        name: "Push-up",
                                    },
                                    {
                                        link: "/sutias/tomara-que-caia/?O=OrderByReleaseDateDESC",
                                        name: "Tomara-que-caia",
                                    },
                                    {
                                        link: "/sutias/triangulo/?O=OrderByReleaseDateDESC",
                                        name: "Triângulo",
                                    },
                                ],
                                name: "Modelo",

                            },
                            {

                                items: [
                                    {
                                        link: "/sutias/Para Seduzir?map=c,c,specificationFilter_48",
                                        name: "Sexy",
                                    },
                                    {
                                        link: "/sutias/Básico para o dia-a-dia?map=c,c,specificationFilter_48",
                                        name: "Básicos para o dia-a-dia",
                                    },
                                    {
                                        link: "/sutias/Para não marcar?map=c,c,specificationFilter_48",
                                        name: "Para não marcar",
                                    },
                                    {
                                        link: "/sutias/Para unir e levantar?map=c,c,specificationFilter_48",
                                        name: "Para unir e aumentar os seios",
                                    },
                                    {
                                        link: "/sutias/Para ombros e costas à mostra?map=c,c,specificationFilter_48",
                                        name: "Para mostrar",
                                    },
                                    {
                                        link: "/sutias/Para seios pequenos?map=c,c,specificationFilter_48",
                                        name: "Para seios pequenos",
                                    },
                                    {
                                        link: "/sutias/Para seios grandes?map=c,c,specificationFilter_48",
                                        name: "Para seios grandes",
                                    },
                                ],
                                name: "Ocasião",
                            },
                            {
                                items: [
                                    {
                                        link: "/sutias/renda?map=c,c,specificationFilter_43",
                                        name: "Renda",
                                    },
                                    {
                                        link: "/sutias/microfibra?map=c,c,specificationFilter_43",
                                        name: "Microfibra",
                                    },
                                    {
                                        link: "/sutias/com aro?map=c,c,specificationFilter_43",
                                        name: "Com Aro",
                                    },
                                    {
                                        link: "/sutias/sem aro?map=c,c,specificationFilter_43",
                                        name: "Sem Aro",
                                    },
                                    {
                                        link: "/sutias/sem bojo?map=c,c,specificationFilter_43",
                                        name: "Sem Bojo",
                                    },
                                    {
                                        link: "/sutias/com bojo?map=c,c,specificationFilter_43",
                                        name: "Com Bojo",
                                    },
                                ],
                                name: "Característica",

                            },
                            ],
                        },
                        {
                            link: "/calcinhas/?O=OrderByReleaseDateDESC",
                            name: "Calcinhas",
                            siblings: [{
                                items: [
                                    {
                                        link: "/calcinhas/calecon/?O=OrderByReleaseDateDESC",
                                        name: "Caleçon",
                                    },
                                    {
                                        link: "/calcinhas/fio-dental/?O=OrderByReleaseDateDESC",
                                        name: "Fio dental",
                                    },
                                    {
                                        link: "/calcinhas/reta/?O=OrderByReleaseDateDESC",
                                        name: "Reta",
                                    },
                                    {
                                        link: "/calcinhas/tanga/?O=OrderByReleaseDateDESC",
                                        name: "Tanga",
                                    },

                                ],
                                name: "Modelo",

                            },
                            {

                                items: [
                                    {
                                        link: "/calcinhas/Para seduzir?map=c,c,specificationFilter_49",
                                        name: "Sexy",
                                    },
                                    {
                                        link: "/calcinhas/Básicas para o dia-a-dia?map=c,c,specificationFilter_49",
                                        name: "Básicas",
                                    },
                                    {
                                        link: "/calcinhas/Para não marcar?map=c,c,specificationFilter_49",
                                        name: "Para não marcar",
                                    },
                                    {
                                        link: "/calcinhas/Para exercicio?map=c,c,specificationFilter_49",
                                        name: "Para se exercitar",
                                    },
                                ],
                                name: "Ocasião",
                            },
                            {

                                items: [
                                    {
                                        link: "/calcinhas/cintura alta?map=c,c,specificationFilter_46",
                                        name: "Cintura Alta",
                                    },
                                    {
                                        link: "/calcinhas/De algodão?map=c,c,specificationFilter_46",
                                        name: "Algodão",
                                    },
                                    {
                                        link: "/calcinhas/microfibra?map=c,c,specificationFilter_46",
                                        name: "Microfibra",
                                    },
                                    {
                                        link: "/calcinhas/renda?map=c,c,specificationFilter_46",
                                        name: "Renda",
                                    },
                                    {
                                        link: "/calcinhas/ZERO costura?map=c,c,specificationFilter_46",
                                        name: "Zero Costura",
                                    },
                                ],
                                name: "Característica",
                            },
                            ],
                        },
                        {
                            link: "/vestuario/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Vestuário",
                            siblings: [{
                                items: [
                                    {
                                        link: "/vestuario/blusa/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Blusa",
                                    },
                                    {
                                        link: "/vestuario/body/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Body",
                                    },
                                    {
                                        link: "/vestuario/camiseta/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Camiseta",
                                    },
                                    {
                                        link: "/vestuario/casaco/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Casaco",
                                    },
                                    {
                                        link: "/vestuario/legging-e-calca/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Legging e Calça",
                                    },
                                    {
                                        link: "/vestuario/regata/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Regata",
                                    },
                                    {
                                        link: "/vestuario/vestido/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Vestido",
                                    },

                                ],
                                name: "Categoria",
                            },
                            ],
                        },

                        {
                            link: "/noite/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Linha noite",
                            siblings: [{
                                items: [
                                    {
                                        link: "/noite/combinacao---camisola/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Combinação e Camisola",
                                    },
                                    {
                                        link: "/noite/pijama/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Pijama",
                                    },
                                    {
                                        link: "/noite/robe/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                                        name: "Robe",
                                    },
                                ],
                                name: "Categoria",
                            },
                            ],
                        },
                        {
                            link: "/lingeries/?O=OrderByReleaseDateDESC",
                            name: "Lingerie",
                        },
                        {
                            link: "/acessorios/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Acessórios",
                        },
                        {
                            link: "/noiva/",
                            name: "Linha Noiva",
                        },
                        {
                            link: "/promocoes/Ela",
                            name: "Promoções para ela",
                        },
                        ],
                    }],
                },
                {
                    banners: [
                        {
                            src: "Aba_Lingerie.jpg",
                            href: "/vestuario/body/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",

                        },
                    ],
                    link: "/lingeries/?O=OrderByReleaseDateDESC",
                    name: "Lingerie",
                    siblings: [{
                        items: [{
                            link: "/vestuario/body/Feminino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Body",
                        },
                        {
                            link: "/cinta liga",
                            name: "Cinta-Liga",
                        },
                        {
                            link: "/calcinhas/?O=OrderByReleaseDateDESC",
                            name: "Calcinhas",
                        },
                        {
                            link: "/sutias/?O=OrderByReleaseDateDESC",
                            name: "Sutiãs",
                        },
                        ],
                    }],
                },
                {
                    banners: [
                        {
                            src: "Banner_Aba_Masculino.jpg",
                            href: "/masculino",
                        },
                    ],
                    link: "/masculino",
                    name: "Masculino",
                    size: "59%",
                    siblings: [{
                        items: [{
                            link: "/cuecas?O=OrderByReleaseDateDESC",
                            name: "Cuecas",
                            isVisible: true,
                            siblings: [{
                                items: [
                                    {
                                        link: "/cuecas/boxer/?O=OrderByReleaseDateDESC",
                                        name: "Boxer",
                                    },
                                    {
                                        link: "/cuecas/slip/?O=OrderByReleaseDateDESC",
                                        name: "Slip",
                                    },
                                ],
                            },
                            ],
                        },
                        {
                            link: "/noite/Masculino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Pijama",
                        },
                        {
                            link: "/vestuario/Masculino?map=c,c,specificationFilter_21&O=OrderByReleaseDateDESC",
                            name: "Vestuario",
                        },
                        {
                            link: "/promocoes/Ele",
                            name: "Promoções para ele",
                        },
                        ],
                    }],
                },
                {
                    banners: [
                        {
                            src: "Aba_Outlet.jpg",
                            href: "/outlet",
                        },
                    ],
                    link: "/outlet/?O=OrderByReleaseDateDESC",
                    name: "Outlet",
                    highlighted: true,
                    siblings: [{
                        items: [{
                            link: "/outlet/sutia-outlet",
                            name: "Sutiãs",
                        },
                        {
                            link: "/outlet/calcinhas-outlet",
                            name: "Calcinhas",
                        },
                        {
                            link: "/outlet/noite-outlet",
                            name: "Noite",
                        },
                        {
                            link: "/outlet/vestuario-outlet",
                            name: "Vestuário",
                        },
                        ],
                    }],
                },
            ];
        } else {
            _items = items;
        }

        ReactDOM.render(<HeaderComponent items={_items} />, document.getElementById("root-header-component"));
    }
}

