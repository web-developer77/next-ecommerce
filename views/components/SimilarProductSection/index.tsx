import React from "react";
import Slider from "react-slick";
import { Product } from "@views/elements";
import { GetProducts_getPrdProductList_result } from "@services/productsService/__generated__/GetProducts";

const settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface ISimilarProductsProps {
  products: Array<GetProducts_getPrdProductList_result | null> | undefined;
}

const SimilarProductSection = (props: ISimilarProductsProps) => {
  const products = props.products
    ? props.products.length < 2
      ? [
        ...props.products,
        ...props.products,
        ...props.products,
        ...props.products,
        ...props.products,
      ]
      : props.products.length < 5
        ? [...props.products, ...props.products, ...props.products]
        : props.products
    : [];

  return (
    <section className="similar-product w-100">
      <div className="page-container">
        <div className="similar-product-box">
          <h3>More Similar Products</h3>
          <div className="product-sub-category similar-product-slider">
            <Slider {...settings}>
              {products?.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarProductSection;
