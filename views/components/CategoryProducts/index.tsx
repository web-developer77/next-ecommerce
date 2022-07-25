import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Slider from 'react-slick'
import { Product } from '@views/elements'
import { GetProducts_getPrdProductList_result } from '@services/productsService/__generated__/GetProducts'

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
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
}

const settings1 = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  fade: true,
}

const categorieImages = [
  '/assets/img/product-category-image-1.webp',
  '/assets/img/product-category-image-2.webp',
  '/assets/img/product-category-image-3.webp',
  '/assets/img/product-category-image-4.webp',
  '/assets/img/product-category-image-5.webp',
]
const categorieImages1 = [
  '/assets/img/single-product-slider-image-1.webp',
  '/assets/img/single-product-slider-image-2.webp',
  '/assets/img/single-product-slider-image-3.webp',
  '/assets/img/single-product-slider-image-4.webp',
  '/assets/img/single-product-slider-image-4.webp',
]
const categorieImages2 = [
  '/assets/img/spare/1.webp',
  '/assets/img/spare/2.webp',
  '/assets/img/spare/3.webp',
  '/assets/img/spare/4.webp',
  '/assets/img/spare/5.webp',
]
const categorieImages3 = [
  '/assets/img/tyre/1.webp',
  '/assets/img/tyre/2.webp',
  '/assets/img/tyre/3.webp',
  '/assets/img/tyre/4.webp',
  '/assets/img/tyre/5.webp',
]
const categorieImages4 = [
  '/assets/img/panel/1.webp',
  '/assets/img/panel/2.webp',
  '/assets/img/panel/3.webp',
  '/assets/img/panel/4.webp',
  '/assets/img/panel/5.webp',
]
const categorieImages5 = [
  '/assets/img/finance/1.webp',
  '/assets/img/finance/2.webp',
  '/assets/img/finance/3.webp',
  '/assets/img/finance/4.webp',
  '/assets/img/finance/5.webp',
]
const categorieImages6 = [
  '/assets/img/wedding/1.webp',
  '/assets/img/wedding/2.webp',
  '/assets/img/wedding/3.webp',
  '/assets/img/wedding/4.webp',
  '/assets/img/wedding/5.webp',
]
const categorieImages7 = [
  [
    '/assets/img/Automotive/1.webp',
    '/assets/img/Automotive/2.webp',
    '/assets/img/Automotive/3.webp',
    '/assets/img/Automotive/4.webp',
  ],
  [
    '/assets/img/Entertainment/1.webp',
    '/assets/img/Entertainment/2.webp',
    '/assets/img/Entertainment/3.webp',
    '/assets/img/Entertainment/4.webp',
  ],
  [
    '/assets/img/Financial/1.webp',
    '/assets/img/Financial/2.webp',
    '/assets/img/Financial/3.webp',
    '/assets/img/Financial/4.webp',
  ],
  [
    '/assets/img/Manufacturing/1.webp',
    '/assets/img/Manufacturing/2.webp',
    '/assets/img/Manufacturing/3.webp',
    '/assets/img/Manufacturing/4.webp',
  ],
  [
    '/assets/img/Attorneys/1.webp',
    '/assets/img/Attorneys/2.webp',
    '/assets/img/Attorneys/3.webp',
    '/assets/img/Attorneys/4.webp',
  ],
  [
    '/assets/img/mag/1.webp',
    '/assets/img/mag/2.webp',
    '/assets/img/mag/3.webp',
    '/assets/img/mag/4.webp',
  ],
  [
    '/assets/img/mag/1.webp',
    '/assets/img/mag/2.webp',
    '/assets/img/mag/3.webp',
    '/assets/img/mag/4.webp',
  ],
]

const categoryBackClassnames = [
  'dtw',
  'ad',
  'artgift',
  'am',
  'che',
]

interface IProductsProps {
  item: {
    categoryName: String,
    products: (GetProducts_getPrdProductList_result | null)[]
  },
  num: Number
}

const ProductSection = (props: IProductsProps) => {
  const { item, num } = props
  const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);

  return (
    <Row className={categoryBackClassnames[Math.floor(Math.random() * (5))]} style={{marginBottom:'30px'}}>
      <Col md={4} xs={12}>
        <div className="product-main-category slider-category">
          <Slider {...settings1}>
            <div className="product-main-category-box">
              <img
                src={categoryId == 1447 ? categorieImages[Math.floor(Math.random() * (5))] : 
                  categoryId == 1402 ? categorieImages1[Math.floor(Math.random() * (5))] : 
                  categoryId == 549 ? categorieImages2[Math.floor(Math.random() * (5))] : 
                  categoryId == 1672 ? categorieImages3[Math.floor(Math.random() * (5))] : 
                  categoryId == 1396 ? categorieImages4[Math.floor(Math.random() * (5))] : 
                  categoryId == 1384 ? categorieImages5[Math.floor(Math.random() * (5))] : 
                  categoryId == 1342 ? categorieImages6[Math.floor(Math.random() * (5))] : 
                  categoryId == 1336 ? categorieImages7[Math.floor(Math.random() * (5))] : 
                  categoryId == 1768 ? categorieImages3[Math.floor(Math.random() * (5))] : 
                  categorieImages7[num][Math.floor(Math.random() * (4))]              
                }
                className="img-responsive"
                alt="product-main-category-box1"
                width="584"
                height="414"
              />
              <div className="product-category-title">
                <h3>{item.categoryName}</h3>
              </div>
            </div>
            <div className="product-main-category-box">
              <img
                src={categorieImages[Math.floor(Math.random() * (5))]}
                className="img-responsive"
                alt="product-main-category-box2"
                width="584"
                height="414"
              />
              <div className="product-category-title">
                <h3>{item.categoryName}</h3>
              </div>
            </div>
          </Slider>
        </div>
      </Col>
      <Col md={8} xs={12}>
        <div className="product-sub-category slider-sub-category">
          {/* Slider */}
          <Slider {...settings}>
            {item.products.map((product, i) => (
              <Product product={product} key={i} />
            ))}
          </Slider>
        </div>
      </Col>
    </Row>
  )
}

export default ProductSection
