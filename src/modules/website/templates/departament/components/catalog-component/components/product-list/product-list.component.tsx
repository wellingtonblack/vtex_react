
import * as React from "react";
import "./product-list.component.scss";
import { ProductListProps, ProductListState } from "./product-list.model";
import { link } from "fs";
import { CardTemplate3Component } from "../../../../../shared/components/shelf-default/components/card-template3/card-template3.component";
import { ProductApi, Item } from "../../../../../shared/models/product-api.model";
import { Product } from "../../../../../shared/models/product.model";
import { DomService } from "../../../../../shared/services/dom.service";
import { OrderByComponent } from "../order-by/order-by.component";

export class ProductListComponent extends React.Component<ProductListProps, ProductListState> {

    /**
     *
     */
    constructor(props: ProductListProps) {
        super(props);

    }

    public parseMoney(price: number): string {
        return `R$ ${price.toFixed(2).replace(/\./, ",")}`;
    }

    public parseInfo(product: ProductApi): Product {

        const itemAvaible = product.items.find((item: Item, index: number) => {
            if (item.sellers.find((seller) => seller.sellerDefault).commertialOffer.AvailableQuantity > 0) {
                return true;
            }
        });

        if (!itemAvaible) {
            return;
        }

        const sellerDeafult = (itemAvaible) ? itemAvaible.sellers.find((seller) => seller.sellerDefault) : null;
        let bestPrice = (itemAvaible) ? sellerDeafult.commertialOffer.Price : 0;
        let listPrice = (itemAvaible) ? sellerDeafult.commertialOffer.ListPrice : 0;
        bestPrice = parseInt(`${bestPrice.toFixed(2).replace(/\./, "")}`);
        listPrice = parseInt(`${listPrice.toFixed(2).replace(/\./, "")}`);

        const productReturn: Product = {
            bestPrice,
            bestPriceFormated: this.parseMoney(sellerDeafult.commertialOffer.Price),
            brand: product.brand,
            category: "",
            department: "",
            uri: product.link,
            stock: (itemAvaible) ? true : false,
            skuId: (itemAvaible) ? parseInt(itemAvaible.itemId) : 0,
            productId: parseInt(product.productId),
            numbersOfInstallment: 0,
            name: product.productName,
            listPriceFormated: this.parseMoney(sellerDeafult.commertialOffer.ListPrice),
            listPrice,
            installmentValue: 0,
            imageWearFront: this.getImage("wearfront", itemAvaible),
            imageWearBack: this.getImage("wearback", itemAvaible),
            imagePath: this.getImage("Swatch", itemAvaible),
            imageLookFront: this.getImage("Look-front", itemAvaible),
            imageLookBack: this.getImage("Look-back", itemAvaible),
            imageFront: this.getImage("Front", itemAvaible),
            hightLight: "",
            hasBestPrice: listPrice > bestPrice,
            escapedName: product.productName.replace(/\s/, "-"),
            discountHightLight: "",
            departmentName: "",
        };
        return productReturn;
    }

    public getProduct(product: ProductApi, index: number) {
        const productReturn = this.parseInfo(product);
        if (!productReturn) {
            return;
        }

        return <div className="col-xs-12 col-md-6 col-lg-4 item-list">
            <CardTemplate3Component index={1} hoverBack={true} width={500} heigth={320} defaultImage={"wf"} product={productReturn} />
        </div>;
    }

    public getImage(label: string, item: Item) {
        const imagereturn = item.images.find((_image, index) => {
            if (_image && _image.imageLabel && label && _image.imageLabel.toLowerCase() === label.toLowerCase()) {
                return true;
            }
        });

        if (!imagereturn) {
            return "";
        }

        let image = "";
        if (imagereturn.imageTag) {
            image = DomService.getImagePath(imagereturn.imageTag);
        }

        image = image.replace(/#width#/, "300");
        image = image.replace(/#height#/, "300");
        image = image.replace(/\~\//g, "/");

        return image;
    }

    public render() {
        return (
            <div className="container-fluidproduct-list-component">
                <div className="row">
                    {(this.props.products && this.props.products.length === 0) ? (
                        <h3 className="filter-title">Essa combinação de filtros não trouxe nenhum resultado de busca!</h3>
                    ) : (this.props.products && this.props.products.length > 0) ? this.props.products.map((product, index) => this.getProduct(product, index)) : (
                        <h3 className="filter-title">Aguarde estamos carregando os items!</h3>
                    )}
                </div>
            </div>
        );
    }
}
