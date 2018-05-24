import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.scss";
import "slick-carousel/slick/slick.scss";
import { ProductSlider, SkuSlider } from "./models/product-slider";
import { SkuSelectorComponent } from "../sku-selector/sku-selector.component";
import { DataProductService } from "../../../shared/services/data-products.service";
import { ProductsVariationImage, ProductVariation } from "../../../shared/models/product-variation.model";
import { link } from "fs";
import "./slider-product.component.scss";
import { PriceProductComponent } from "../price-product/price-product.component";
import { ButtonBuyComponent } from "../button-buy/button-buy.component";
import { QuantitySelectorComponent } from "../../../shared/components/quantity-selector/quantity-selector.component";
import { OderformModel } from "../../../shared/models/orderform.model";
import { WhishListComponent } from "../../../shared/components/shelf-default/components/shared/whishlist-buttom/wishlist-buttom.component";
import { DataEnhancedService } from "../../../shared/services/data-enhanced.service";
import { UtilsService } from "../../../shared/services/utils.service";

export interface SliderProductProps {

}

export interface SliderProductState {
  productSlider: ProductSlider;
  images: string[];
  sku: SkuSlider;
  productVariation: ProductVariation;
  quantity: number;
  isChooseSku: boolean;
}

declare const vtexjs: any;

export class SliderProductComponent extends React.Component<SliderProductProps, SliderProductState> {


  public slider: any;
  public controls: any;

  constructor(props: SliderProductProps) {
    super(props);




    new vtexjs.Catalog()
      .getCurrentProductWithVariations()
      .then((data: ProductSlider) => {
        this.state = {
          productSlider: data,
          images: null,
          sku: null,
          productVariation: null,
          isChooseSku: null,
          quantity: 1,
        };

        DataProductService.getSkuProduct(data.skus[0].sku)
          .then((product) => {
            const images = this.getImagesSlider(product.Images);
            this.setState({
              images,
              sku: data.skus.find((sku) => sku.available),
              productVariation: product,
            });
          });
      });
  }

  public getImagesSlider(images: ProductsVariationImage[][]): string[] {
    const imagesReturn = images.map((image: ProductsVariationImage[], index: number) => {
      if (image[0].Name.toLocaleLowerCase() !== "swatch") {
        return image[0].Path;
      }
    });
    return imagesReturn;
  }

  public handleSelectedSize(skuSelected: SkuSlider) {

    this.state.productSlider.skus.forEach((sku: SkuSlider) => {
      sku.selected = false;
    });

    skuSelected.selected = true;
    this.setState({
      sku: skuSelected,
      productSlider: this.state.productSlider,
      isChooseSku: true,
    });
  }

  public updateCart() {
    window.dispatchEvent(new CustomEvent("minicart.update"));
    window.dispatchEvent(new CustomEvent("minicart.state", { detail: true }));
  }

  public render() {

    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      lazyLoad: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      afterChange: (index: number) => {
        this.controls.slickGoTo(index);
      },
      responsive: [{
        breakpoint: 580,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }],
    };

    const settings2 = {
      dots: false,
      infinite: false,
      arrow: false,
      speed: 500,
      lazyLoad: true,
      swipeToSlide: true,
      slidesToShow: 5,
      focusOnSelect: true,
      afterChange: (index: number) => {
        this.slider.slickGoTo(index);
      },
      responsive: [{
        breakpoint: 580,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      }],
    };


    return (
      <div className="slider-product-component container-fluid wrapper">
        <div className="row no-gutters wrapper-slider-selector">
          <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12 slider-wrapper">

            {this.state.images ? (
              <Slider className="slider slider-main" {...settings} ref={(slider) => (this.slider = slider)}>
                {this.state.images.map((imagePath) => (imagePath) ? <div className="slide-product-image col-lg-12"><img src={imagePath} alt="teste" /></div> : "")}
              </Slider>
            ) : ""}
            {this.state.images ? (
              <Slider
                className="slider"
                ref={(slider) => (this.controls = slider)}
                {...settings2}>
                {this.state.images.map((imagePath) => (imagePath) ? <div className="slide-product-image"><img src={UtilsService.cropImage(200, 134, imagePath)} alt="teste" /></div> : "")}
              </Slider>
            ) : ""}
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 skuselector-wrapper">
            <h1 className="title-product">{this.state.productSlider.name}</h1>
            <PriceProductComponent sku={this.state.sku} />
            <SkuSelectorComponent
              isChooseSku={this.state.isChooseSku}
              productVariation={this.state.productVariation}
              handleSelecteSize={this.handleSelectedSize.bind(this)}
              productSlider={this.state.productSlider} />
            
            <QuantitySelectorComponent
              handleAddQuantity={(quantity) => {
                this.setState({
                  quantity,
                }, () => {
                  (window as any).loading(true);
                  vtexjs.checkout.getOrderForm()
                    .then((orderForm: OderformModel) => {


                      const itemReturn = orderForm.items.find((item) => {
                        if (parseInt(item.id) === this.state.sku.sku) {
                          return true;
                        }
                      });

                      if (itemReturn) {

                        const data: any = {
                          category: "",
                          brand: "",
                          productId: itemReturn.productId,
                          name: itemReturn.name,
                          skuId: itemReturn.skuName,
                          bestPrice: itemReturn.sellingPrice,
                        };
                        DataEnhancedService.addToCart(data, 1);

                        vtexjs.checkout.updateItems([{
                          index: orderForm.items.indexOf(itemReturn),
                          quantity: this.state.quantity,
                        }]).then(() => {
                          (window as any).loading(false);
                          this.updateCart();
                        }, () => {
                          (window as any).loading(false);
                          this.updateCart();
                        });
                      } else {
                        (window as any).loading(false);
                      }
                    }, () => {
                      (window as any).loading(false);
                      this.updateCart();
                    });
                });
              }}
              handleRemoveQuantity={(quantity) => {
                this.setState({
                  quantity,
                }, () => {
                  (window as any).loading(true);
                  vtexjs.checkout.getOrderForm()
                    .then((orderForm: OderformModel) => {

                      const itemReturn = orderForm.items.find((item) => {
                        if (parseInt(item.id) === this.state.sku.sku) {
                          return true;
                        }
                      });

                      if (itemReturn) {

                        const data: any = {
                          category: "",
                          brand: "",
                          productId: itemReturn.productId,
                          name: itemReturn.name,
                          skuId: itemReturn.skuName,
                          bestPrice: itemReturn.sellingPrice,
                        };
                        DataEnhancedService.removeFromCart(data, 1);

                        vtexjs.checkout.updateItems([{
                          index: orderForm.items.indexOf(itemReturn),
                          quantity: this.state.quantity,
                        }]).then(() => {
                          (window as any).loading(false);
                          this.updateCart();
                        }, () => {
                          (window as any).loading(false);
                          this.updateCart();
                        });
                      } else {
                        (window as any).loading(false);
                      }
                    }, () => {
                      (window as any).loading(false);
                      this.updateCart();
                    });
                });
              }}
              handleRemoveCart={() => {
                (window as any).loading(true);
                vtexjs.checkout.getOrderForm()
                  .then((orderForm: OderformModel) => {
                    const itemReturn = orderForm.items.find((item) => {
                      if (parseInt(item.id) === this.state.sku.sku) {
                        return true;
                      }
                    });
                    if (itemReturn) {

                      const data: any = {
                        category: "",
                        brand: "",
                        productId: itemReturn.productId,
                        name: itemReturn.name,
                        skuId: itemReturn.skuName,
                        bestPrice: itemReturn.sellingPrice,
                      };
                      DataEnhancedService.removeFromCart(data, 1);

                      vtexjs.checkout.removeItems([
                        {
                          index: orderForm.items.indexOf(itemReturn),
                          quantity: 0,
                        },
                      ]).then(() => {
                        (window as any).loading(false);
                        this.updateCart();
                      }, () => {
                        (window as any).loading(false);
                      });
                    }
                  }, () => {
                    (window as any).loading(false);
                    this.updateCart();
                  });
              }}
              max={(this.state.sku) ? this.state.sku.availablequantity : 0}
              inital={this.state.quantity}>QUANTIDADE: </QuantitySelectorComponent>
            <ButtonBuyComponent handleBuy={() => {

              if (this.state.isChooseSku === null || !this.state.isChooseSku) {
                this.setState({
                  isChooseSku: false,
                });
                return;
              }

              (window as any).loading(true);
              vtexjs.checkout.getOrderForm()
                .then((orderForm: OderformModel) => {

                  const itemReturn = orderForm.items.find((item) => {
                    if (parseInt(item.id) === this.state.sku.sku) {
                      return true;
                    }
                  });

                  

                  if (itemReturn) {

                    const data: any = {
                      category: "",
                      brand: "",
                      productId: itemReturn.productId,
                      name: itemReturn.name,
                      skuId: itemReturn.skuName,
                      bestPrice: itemReturn.sellingPrice,
                    };
                    DataEnhancedService.addToCart(data, this.state.quantity);

                    vtexjs.checkout.updateItems([{
                      index: orderForm.items.indexOf(itemReturn),
                      quantity: this.state.quantity,
                    }]).then(() => {
                      (window as any).loading(false);
                      this.updateCart();
                    }, () => {
                      (window as any).loading(false);
                      this.updateCart();
                    });
                  } else {

                    const data: any = {
                      category: "",
                      brand: "",
                      productId: this.state.productVariation.IdProduct,
                      name: this.state.productVariation.Name,
                      skuId: this.state.sku.skuname,
                      bestPrice: this.state.sku.bestPrice,
                    };

                    DataEnhancedService.addToCart(data, this.state.quantity);
                    vtexjs.checkout.addToCart([{
                      id: this.state.sku.sku,
                      quantity: this.state.quantity,
                      seller: "1",
                    }]).then(() => {
                      (window as any).loading(false);
                      this.updateCart();
                    }, () => {
                      (window as any).loading(false);
                      this.updateCart();
                    });
                  }
                }, () => {
                  (window as any).loading(false);
                  this.updateCart();
                });
            }} />
            {(this.state.sku) ? (
              <WhishListComponent product={{
                bestPrice: 0,
                bestPriceFormated: "",
                brand: "",
                category: "",
                department: "",
                uri: "",
                stock: true,
                skuId: this.state.sku.sku,
                productId: this.state.productVariation.IdProduct,
                numbersOfInstallment: this.state.sku.installments,
                name: this.state.productVariation.Name,
                listPriceFormated: "",
                listPrice: this.state.sku.listPrice,
                installmentValue: this.state.sku.installmentsValue,
                imageWearFront: "",
                imageWearBack: "",
                imagePath: "",
                imageLookFront: "",
                imageLookBack: "",
                imageFront: "",
                hightLight: "",
                hasBestPrice: false,
                escapedName: this.state.productSlider.name.replace(/\s/, "-"),
                discountHightLight: "",
                departmentName: "",
              }}> guardar para mais tarde</WhishListComponent>
            ) : ""}
          </div>
        </div>
      </div>
    );
  }
}
