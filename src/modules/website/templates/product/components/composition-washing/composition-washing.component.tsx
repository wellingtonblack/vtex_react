import * as React from "react";
import { DataProductService } from "../../../shared/services/data-products.service";
import { ProductSlider } from "../slider-product/models/product-slider";
import { ProductApi } from "../../../shared/models/product-api.model";
import "./composition-washing.component.scss";
import { DataEnhancedService } from "../../../shared/services/data-enhanced.service";
export interface CompositionWashingProps {

}

export interface CompositionWashingState {
    product: ProductApi;
}

declare const vtexjs: any;

export class CompositionWashingComponent extends React.Component<CompositionWashingProps, CompositionWashingState> {

    constructor(props: CompositionWashingProps) {
        super(props);

        this.state = {
            product: null,
        };
    }

    public getIcon(icon: string) {
        if (icon === "secar") {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.31 35.03">
                <g id="Layer_2" data-name="Layer 2">
                    <g id="pdp">
                        <path className="cls-1" d="M32.58,0H2.73A2.74,2.74,0,0,0,0,2.73V32.3A2.73,2.73,0,0,0,2.73,35H32.58a2.73,2.73,0,0,0,2.73-2.73V2.73A2.73,2.73,0,0,0,32.58,0Zm1.13,32.3a1.12,1.12,0,0,1-1.13,1.13H2.73A1.13,1.13,0,0,1,1.6,32.3V2.73A1.14,1.14,0,0,1,2.73,1.6H32.58a1.13,1.13,0,0,1,1.13,1.13Z"
                        />
                        <path className="cls-1" d="M27.79,16.72H7.52a.8.8,0,0,0,0,1.6H27.79a.8.8,0,0,0,0-1.6Z"
                        />
                    </g>
                </g>
            </svg>;
        } else if (icon === "passar a ferro") {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.85 28.99">
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M42.25,12.2,39.1,5.08l2.67-1.94a.81.81,0,0,0-1-1.3L38.23,3.73a3,3,0,0,0-1.87-.8L15.38,0h-.11a2.81,2.81,0,0,0-2.81,2.8v.94a2.82,2.82,0,0,0,2.74,2.8L30.93,9.05l-2.8,2H23a.8.8,0,0,0-.8.8v.83a.71.71,0,0,0,0,.2H17.93L2,1.84A.8.8,0,0,0,1.1,3.15l14,9.77H13.47A13.48,13.48,0,0,0,0,26.39c0,.32,0,.64,0,.95A2.06,2.06,0,0,0,2.26,29H40.72a2.13,2.13,0,0,0,2.13-2.13V15.07a8.27,8.27,0,0,0-.6-2.87ZM15.39,5h-.12a1.2,1.2,0,0,1-1.2-1.2V2.8a1.2,1.2,0,0,1,1.15-1.2l21,2.93h.11a1.25,1.25,0,0,1,.58.18l-4.13,3ZM33.16,9.41l.34.05.13,0a1.29,1.29,0,0,1,1.06.73l1,2.55c0,.08,0,.13,0,.13a.3.3,0,0,1-.15,0h-3.8a.71.71,0,0,0,0-.2v-.83a.8.8,0,0,0-.8-.8h-.14Zm-9.74,5.11-1.57,1.14-1.63-1.14ZM5.77,27.38H2.26a1.6,1.6,0,0,1-.63-.15c0-.28,0-.55,0-.84A11.88,11.88,0,0,1,13.47,14.52h4l3.07,2.14Zm2.72,0,13.39-9.75,14,9.76Zm32.76-.53a.54.54,0,0,1-.53.54v0h-2L23.25,16.63l2.89-2.11h9.41A1.73,1.73,0,0,0,37,13.81a1.76,1.76,0,0,0,.15-1.62l-1-2.55a2.84,2.84,0,0,0-1.35-1.45l2.94-2.14,3,6.79a6.84,6.84,0,0,1,.47,2.23Z"
                        id="pdp" />
                </g>
            </svg>;
        } else if (icon === "lavar") {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 41.65">
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M43.09,15.89c-.7-.55-1.49-.16-1.49.28a1.52,1.52,0,0,0,.57,1,.84.84,0,0,1,.23.57v.8a.79.79,0,0,1-.8.78h-.42c-.23,0-.46.31-.52.69l-.11.69L40,24.85l-2.12-1.74a4.42,4.42,0,0,0-4.82-.34l-2.55,1.55-.06,0a35.48,35.48,0,0,1,.45-5.61l.48-2.24.2-1.74a8.48,8.48,0,0,0-.42-3.52,19.37,19.37,0,0,0-1.37-2.69,11.81,11.81,0,0,1-.88-1.67,14.3,14.3,0,0,1-.19-2.71V1.86a.8.8,0,0,0-1.6,0v2.3A14.82,14.82,0,0,0,27.4,7.4a12.84,12.84,0,0,0,1,2,18.57,18.57,0,0,1,1.24,2.44A6.81,6.81,0,0,1,30,14.57l-.19,1.66-.46,2.17a36,36,0,0,0-.49,6.2c0,2.28-.08,3.92-.12,4.15a.49.49,0,0,1-.2.18,2.08,2.08,0,0,1-.73.05l-.09,0a3,3,0,0,1-.46-.1v-9a.8.8,0,1,0-1.59,0V31a.5.5,0,0,1-.08.21,2.43,2.43,0,0,1-.69.15,1.53,1.53,0,0,1-.81-.37L24,30.94V19.87a.8.8,0,0,0-1.6,0V31.76l0,.13c-.06.25-.07.3-.2.41a1.49,1.49,0,0,1-.52,0,3.2,3.2,0,0,1-.47-.13.55.55,0,0,1-.12-.34c0-.08,0-.15,0-.19a.87.87,0,0,0,0-.28V19.87a.8.8,0,1,0-1.59,0V31a4.09,4.09,0,0,1-1,0c-.36-.05-.43-.14-.51-.28a15.19,15.19,0,0,1-.51-4.2v-.47c0-.39,0-.77,0-1.11,0-.65,0-1.15,0-1.56V14.93a.79.79,0,0,0-.79-.8.8.8,0,0,0-.81.8V21.8a2.66,2.66,0,0,1-.87,0,1.9,1.9,0,0,1-.62-.68,14,14,0,0,1-.37-3.7V13.33a5.22,5.22,0,0,1,.45-1.72,22.53,22.53,0,0,1,1.28-2.23L17.33,6.9A8.41,8.41,0,0,0,18.25,3V.8a.8.8,0,1,0-1.59,0V3A7.08,7.08,0,0,1,16,6L14.39,8.49A21.17,21.17,0,0,0,13,10.93a6.54,6.54,0,0,0-.61,2.4v4.14A13.68,13.68,0,0,0,13,21.91a3.19,3.19,0,0,0,1.52,1.45,3.75,3.75,0,0,0,1.38.07v1.26a3,3,0,0,1-1.48-.37l-2.59-1.56A4.63,4.63,0,0,0,6.93,23L4.38,24.91l-.56-4.18-.07-.68a.74.74,0,0,0-.7-.68H2.41a.8.8,0,0,1-.81-.8v-.8a.76.76,0,0,1,.24-.56,1.6,1.6,0,0,0,.56-1c0-.44-.79-.83-1.49-.28A2.4,2.4,0,0,0,0,17.77v.8A2.41,2.41,0,0,0,2.4,21s.33,2.31.73,5.32a1.13,1.13,0,0,0,0,.18L5,39.92a2,2,0,0,0,2,1.73H37.42a2,2,0,0,0,2-1.73l2.55-19a2.39,2.39,0,0,0,2-2.36v-.8a2.4,2.4,0,0,0-.91-1.88ZM38,39.73a.65.65,0,0,1-.59.52H6.94a.65.65,0,0,1-.59-.52l-1.73-13,3.26-2.44A3.07,3.07,0,0,1,11,24.13l2.59,1.56a4.59,4.59,0,0,0,2.31.6v.92a.19.19,0,0,0,0,.08,13.36,13.36,0,0,0,.67,4.19,2.11,2.11,0,0,0,1.7,1.11,5.39,5.39,0,0,0,1.33,0,1.76,1.76,0,0,0,.89,1.05,3.9,3.9,0,0,0,1.32.3,2.11,2.11,0,0,0,1.33-.35,2.08,2.08,0,0,0,.67-.87,3.38,3.38,0,0,0,.84.25,3.25,3.25,0,0,0,1.57-.25,2.21,2.21,0,0,0,1.12-2.19l.11,0h.08A3.55,3.55,0,0,0,29,30.47a2,2,0,0,0,1.27-1.23,21.72,21.72,0,0,0,.19-3.16,4.36,4.36,0,0,0,.9-.39l2.55-1.55a2.82,2.82,0,0,1,3,.21l2.88,2.37Z"
                        id="pdp" />
                </g>
            </svg>;
        } else if (icon === "centrifugar") {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 41.65">
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M43.09,15.89c-.7-.55-1.49-.16-1.49.28a1.52,1.52,0,0,0,.57,1,.84.84,0,0,1,.23.57v.8a.79.79,0,0,1-.8.78h-.42c-.23,0-.46.31-.52.69l-.11.69L40,24.85l-2.12-1.74a4.42,4.42,0,0,0-4.82-.34l-2.55,1.55-.06,0a35.48,35.48,0,0,1,.45-5.61l.48-2.24.2-1.74a8.48,8.48,0,0,0-.42-3.52,19.37,19.37,0,0,0-1.37-2.69,11.81,11.81,0,0,1-.88-1.67,14.3,14.3,0,0,1-.19-2.71V1.86a.8.8,0,0,0-1.6,0v2.3A14.82,14.82,0,0,0,27.4,7.4a12.84,12.84,0,0,0,1,2,18.57,18.57,0,0,1,1.24,2.44A6.81,6.81,0,0,1,30,14.57l-.19,1.66-.46,2.17a36,36,0,0,0-.49,6.2c0,2.28-.08,3.92-.12,4.15a.49.49,0,0,1-.2.18,2.08,2.08,0,0,1-.73.05l-.09,0a3,3,0,0,1-.46-.1v-9a.8.8,0,1,0-1.59,0V31a.5.5,0,0,1-.08.21,2.43,2.43,0,0,1-.69.15,1.53,1.53,0,0,1-.81-.37L24,30.94V19.87a.8.8,0,0,0-1.6,0V31.76l0,.13c-.06.25-.07.3-.2.41a1.49,1.49,0,0,1-.52,0,3.2,3.2,0,0,1-.47-.13.55.55,0,0,1-.12-.34c0-.08,0-.15,0-.19a.87.87,0,0,0,0-.28V19.87a.8.8,0,1,0-1.59,0V31a4.09,4.09,0,0,1-1,0c-.36-.05-.43-.14-.51-.28a15.19,15.19,0,0,1-.51-4.2v-.47c0-.39,0-.77,0-1.11,0-.65,0-1.15,0-1.56V14.93a.79.79,0,0,0-.79-.8.8.8,0,0,0-.81.8V21.8a2.66,2.66,0,0,1-.87,0,1.9,1.9,0,0,1-.62-.68,14,14,0,0,1-.37-3.7V13.33a5.22,5.22,0,0,1,.45-1.72,22.53,22.53,0,0,1,1.28-2.23L17.33,6.9A8.41,8.41,0,0,0,18.25,3V.8a.8.8,0,1,0-1.59,0V3A7.08,7.08,0,0,1,16,6L14.39,8.49A21.17,21.17,0,0,0,13,10.93a6.54,6.54,0,0,0-.61,2.4v4.14A13.68,13.68,0,0,0,13,21.91a3.19,3.19,0,0,0,1.52,1.45,3.75,3.75,0,0,0,1.38.07v1.26a3,3,0,0,1-1.48-.37l-2.59-1.56A4.63,4.63,0,0,0,6.93,23L4.38,24.91l-.56-4.18-.07-.68a.74.74,0,0,0-.7-.68H2.41a.8.8,0,0,1-.81-.8v-.8a.76.76,0,0,1,.24-.56,1.6,1.6,0,0,0,.56-1c0-.44-.79-.83-1.49-.28A2.4,2.4,0,0,0,0,17.77v.8A2.41,2.41,0,0,0,2.4,21s.33,2.31.73,5.32a1.13,1.13,0,0,0,0,.18L5,39.92a2,2,0,0,0,2,1.73H37.42a2,2,0,0,0,2-1.73l2.55-19a2.39,2.39,0,0,0,2-2.36v-.8a2.4,2.4,0,0,0-.91-1.88ZM38,39.73a.65.65,0,0,1-.59.52H6.94a.65.65,0,0,1-.59-.52l-1.73-13,3.26-2.44A3.07,3.07,0,0,1,11,24.13l2.59,1.56a4.59,4.59,0,0,0,2.31.6v.92a.19.19,0,0,0,0,.08,13.36,13.36,0,0,0,.67,4.19,2.11,2.11,0,0,0,1.7,1.11,5.39,5.39,0,0,0,1.33,0,1.76,1.76,0,0,0,.89,1.05,3.9,3.9,0,0,0,1.32.3,2.11,2.11,0,0,0,1.33-.35,2.08,2.08,0,0,0,.67-.87,3.38,3.38,0,0,0,.84.25,3.25,3.25,0,0,0,1.57-.25,2.21,2.21,0,0,0,1.12-2.19l.11,0h.08A3.55,3.55,0,0,0,29,30.47a2,2,0,0,0,1.27-1.23,21.72,21.72,0,0,0,.19-3.16,4.36,4.36,0,0,0,.9-.39l2.55-1.55a2.82,2.82,0,0,1,3,.21l2.88,2.37Z"
                        id="pdp" />
                </g>
            </svg>;
        } else if (icon === "branquear") {
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.33 37.09">
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M41.19,8a.81.81,0,0,0-1.12-.2L29.8,15,22.22,1.15A2,2,0,0,0,20.56,0,2,2,0,0,0,18.9,1.15L11.45,15,1.26,7.84A.81.81,0,0,0,.14,8a.81.81,0,0,0,.2,1.12l10.35,7.21L1.1,34.15a2,2,0,0,0-.07,2,2,2,0,0,0,1.82.91H38.48a2,2,0,0,0,1.78-.86.39.39,0,0,0,.14-.12.76.76,0,0,0,.12-.63,2.26,2.26,0,0,0-.29-1.33L30.57,16.44,41,9.16A.81.81,0,0,0,41.19,8ZM20.31,1.91a.86.86,0,0,1,.24-.31s.14.08.27.31l7.66,14-7.79,5.44-7.92-5.51Zm-1,20.46L3.21,33.61,12,17.29Zm1.4,1L38.1,35.49H3.31ZM38.05,33.5l-16-11.13,7.16-5Z"
                        id="pdp" />
                </g>
            </svg>;
        } else if (icon === "lavar a seco") {
            return <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M507.362,378.489l-52.057-27.399c14.07-28.73,21.982-61.002,21.982-95.09s-7.913-66.36-21.982-95.09l52.057-27.399 c4.242-2.233,5.87-7.481,3.638-11.722c-2.232-4.242-7.479-5.867-11.72-3.638l-52.231,27.49 C409.221,81.887,339.694,39.052,260.339,39.052c-80.798,0-151.412,44.404-188.745,110.085l-58.873-30.986 c-4.239-2.229-9.489-0.604-11.72,3.638c-2.232,4.242-0.604,9.489,3.638,11.722l58.994,31.05 C50.656,192.364,43.391,223.347,43.391,256s7.265,63.636,20.241,91.439l-58.994,31.05c-4.242,2.233-5.87,7.481-3.638,11.722 c1.553,2.951,4.568,4.638,7.686,4.638c1.362,0,2.745-0.322,4.034-1l58.873-30.986c37.333,65.681,107.947,110.085,188.745,110.085 c79.355,0,148.883-42.835,186.71-106.589l52.231,27.49c1.289,0.678,2.672,1,4.034,1c3.119,0,6.133-1.686,7.686-4.638 C513.232,385.97,511.603,380.722,507.362,378.489z M260.339,56.408c72.701,0,136.438,39.078,171.336,97.325L256,246.193 L86.954,157.221C121.369,97.049,186.195,56.408,260.339,56.408z M60.747,256c0-29.736,6.547-57.969,18.259-83.348L237.367,256 l-158.36,83.348C67.294,313.969,60.747,285.736,60.747,256z M260.339,455.592c-74.144,0-138.97-40.641-173.385-100.813 L256,265.807l175.675,92.461C396.777,416.514,333.04,455.592,260.339,455.592z M439.945,343.006L274.633,256l165.311-87.006 c12.798,26.312,19.987,55.834,19.987,87.006S452.743,316.694,439.945,343.006z"
                />
            </svg>;
        }
    }

    public componentWillMount() {
        new vtexjs.Catalog()
            .getCurrentProductWithVariations()
            .then((data: ProductSlider) => {
                DataProductService.getProductsById(data.productId)
                    .then((product) => {
                        this.setState({
                            product,
                        }, () => {
                            const seller = this.state.product.items[0].sellers.find((seller) => seller.commertialOffer.AvailableQuantity > 0) || null;

                            const product: any = {
                                category: this.state.product.categories[0],
                                productId: this.state.product.productId,
                                name: this.state.product.productName,
                                skuId: this.state.product.items[0].nameComplete,
                                bestPrice: (seller) ? seller.commertialOffer.Price : 0,
                                brand: this.state.product.brand,
                            };
                            
                            DataEnhancedService.productDetailView(product);
                        });
                    });
            });
    }

    public render() {
        return (
            (this.state.product) ? (
                <div className="container-fluid wrapper composition-washing-component">
                    <h3 className="title-composition">COMPOSIÇÃO E LAVAGEM</h3>
                    <p className="text-composition">{this.state.product.Composição}</p>
                    <ul className="list-composition">
                        {this.state.product.Cuidados.map((item) => <li className={`${item} icon-composition`}><i className="icon-wrapper">{this.getIcon(item.toLocaleLowerCase())}</i></li>)}
                    </ul>
                </div>
            ) : ""
        );
    }
}
