import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { createSelector } from 'reselect'
import { useAppSelector } from '@redux/hooks'
import businessService from '@services/businessService'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import QuestionModal from '../QuestionModal'
import { categoryData } from '@views/lib/constants'
import style from './component.module.scss'
import {
  GetMst,
  GetMst_getMstSpecialList_result,
} from '@services/productsService/__generated__/GetMst'
import {
  GetMag,
  GetMag_getMagazinesList_result,
} from '@services/productsService/__generated__/GetMag'
import productsService from '@services/productsService'
import Slider from 'react-slick'
import { Product } from '@views/elements'
import { Loading } from '@views/elements'
import { GetProducts_getPrdProductList_result } from '@services/productsService/__generated__/GetProducts'
import referenceService from '@services/referenceService'

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
}
/* interface IAttorneyDetailProps {
  data: any
  relatedData: any,
  categoryData: any,
} */

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)
// interface IProductProps {
//   item: {
//     categoryName: String,
//     products: (GetMst_getMstSpecialList_result | null)[]
//   }
// }
const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

const Detail = (props: any) => {
  const { data } = props
  const [searchParam, setSearchParam] = useState<any>({})
  const [questionModalShow, setQuestionModalShow] = useState<boolean>(false)
  const [scoreList, setScoreList] = useState<any>([])
  const [businessUsers, setBusinessUsers] = useState<any>([])
  const [products, setproducts] = useState<any>([])
  const [mag_products, setMag] = useState<any>([])
  const [special_products, setSpecial] = useState<any>([])
  const { subCategoryList } = useAppSelector(referenceSelector)
  const [prdLoading, setPrdLoading] = useState<boolean>(false)
  const [lawCategories, setLawCategories] = useState<any>([]);
  // console.log(data)

  const fetchProductList = async (
    specialId: number | null,
    specialName: String | null,
    franchiseId: number | null,
    statusIds: String | null,
    distance: number | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: number | null,
    size: number | null,
  ) => {
    setPrdLoading(true)
    const result = await productsService
      .getMstSpecialList(
        null,
        null,
        null,
        null,
        null,
        props.data.companyId.toString(),
        null,
        null,
        null,
        null,
        page || 1,
        null,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setPrdLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        setMag(res.result)
      }
    }
  }

  const fetchProductList2 = async (
    franchiseId: number | null,
    eflyerId: String | null,
    magazineName: String | null,
    statusIds: String | null,
    companyIds: String | null,
    categoryIds: String | null,
    provinceIds: String | null,
    cityIds: String | null,
    suburbIds: String | null,
    page: number | null,
    size: number | null,
  ) => {
    setPrdLoading(true)
    const result = await productsService
      .getMagazinesList(
        null,
        null,
        null,
        null,
        props.data.companyId.toString(),
        null,
        null,
        null,
        null,
        page || 1,
        10,
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setPrdLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        setSpecial(res.result)
      }
    }
  }
  const fetchProductList3 = async (
    page: number,
    categoryid: number | null,
    scopeId: number | null,
    salesTypeId: number | null,
    status: boolean | null,
    domainCategoryIds: String | null,
    typeId: number | null,
    searchText?: string | null,
  ) => {
    setPrdLoading(true)
    const result = await productsService
      .getPrdProductList(
        searchText || null,
        null,
        null,
        null,
        categoryId == 1447 ? null : categoryId,
        null,
        null,
        null,
        null,
        0,
        10,
        page || 1,
        props?.data?.companyId || null
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setPrdLoading(false)
    let res: any = result
    if (res?.success) {
      if (res.result.length > 0) {
        setproducts(res.result)
      }
    }
  }

  const getMstRatingScoreList = async () => {
    const result = await businessService
      .getMstRatingScoreList(
        null, // key
        null, // keyType
        null, // page
        null, // size
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setScoreList(result)
  }

  const getBusinessUsers = async () => {
    const result = await businessService
      .getBusinessUsers(
        data?.companyId || null, // id | null
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setBusinessUsers(result)
  }

  useEffect(() => {
    setMag([])
    setSpecial([])
    getMstRatingScoreList()
    getBusinessUsers()

    fetchProductList3(1, null, null, null, null, null, null, null)
    fetchProductList(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    )
    fetchProductList2(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    )
    fatchLawCategories();
  }, [])

  const fatchLawCategories = async () => {
    const _postList = await referenceService.getPostList(
      null,
      null,
      categoryId,
      9,
      null,
      "Business Details",
      1,
      50
    )
    setLawCategories(_postList);
  }

  const handleClickCategory = (e: any, categoryId: number) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const onContact = () => {
    setSearchParam({ ...searchParam, title: data?.companyName || '' })
    setQuestionModalShow(true)
  }

  // Score
  const excellent =
    scoreList.find((e: any) => e?.ratingScoreName === 'Excellent')
      ?.ratingScorePercent || 0
  const verygood =
    scoreList.find((e: any) => e?.ratingScoreName === 'Very Good')
      ?.ratingScorePercent || 0
  const good =
    scoreList.find((e: any) => e?.ratingScoreName === 'Good')
      ?.ratingScorePercent || 0
  const average =
    scoreList.find((e: any) => e?.ratingScoreName === 'Average')
      ?.ratingScorePercent || 0
  const poor =
    scoreList.find((e: any) => e?.ratingScoreName === 'Poor')
      ?.ratingScorePercent || 0

  const reviews = scoreList.filter((e: any) => e?.title && e?.review)
  return (
    <Container className={style.main}>
      <Row className={style.header}>
        <Col xs={12} md={8}>
          <div className="search_result_detail_left">
            <div className="item_search_image">
              <img
                src={
                  data?.logoPath
                    ? `${categoryData.domain}/Documents/${data.logoPath}`
                    : '/assets/img/searching_list_col_image.webp'
                }
                alt={data?.companyName}
                onError={(e: any) =>
                  (e.target.src = '/assets/img/searching_list_col_image.webp')
                }
              />
              <div className="item_search_image_overlay">
                <h2>{data?.companyName}</h2>
              </div>
            </div>
            <div className="item_search_detail_content">
              <h3>Description :</h3>
              <p>{data?.compDescription}</p>
            </div>
            <div className="item_lawyer_list">
              <h3>Related Results :</h3>
              <ul>
                {businessUsers?.length
                  ? businessUsers
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <li key={index}>
                        <div className="item_lawyer_list_col">
                          <div className="item_lawyer_list_col_image">
                            <img
                              src={
                                item?.logoPath
                                  ? `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${item?.userProfileImage ||
                                  item?.userProfileThumbNailImage
                                  }`
                                  : '/assets/img/item_lawyer_list_col_image_1.webp'
                              }
                              alt={`${item?.firstName || ''} ${item?.lastName || ''
                                }`}
                            />
                          </div>
                          <a>{`${item?.firstName || ''} ${item?.lastName || ''
                            }`}</a>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            {products.length > 0 && <p>Company Products </p>}
            <div className="product-sub-category similar-product-slider">
              {!prdLoading ? (
                <Slider {...settings}>
                  {products?.map(
                    (
                      product: GetProducts_getPrdProductList_result | null,
                      index: React.Key | null | undefined,
                    ) => (
                      <Product product={product} key={index} />
                    ),
                  )}
                </Slider>
              ) : (
                <Loading />
              )}
            </div>
            {mag_products.length > 0 && <p> Special Products </p>}
            <div className="product-sub-category similar-product-slider">
              {!prdLoading ? (
                <Slider {...settings}>
                  {mag_products?.map(
                    (
                      product: GetProducts_getPrdProductList_result | null,
                      index: React.Key | null | undefined,
                    ) => (
                      <Product product={product} key={index} />
                    ),
                  )}
                </Slider>
              ) : (
                <Loading />
              )}
            </div>
            {mag_products.length > 0 && <p>Magazine </p>}
            <div className="product-sub-category similar-product-slider">
              {!prdLoading ? (
                <Slider {...settings}>
                  {special_products?.map(
                    (
                      product: GetProducts_getPrdProductList_result | null,
                      index: React.Key | null | undefined,
                    ) => (
                      <Product product={product} key={index} />
                    ),
                  )}
                </Slider>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="search_result_detail_right">
            <div className="search_result_detail_right_col">
              <h4> Information</h4>
              <div className="search_result_detail_right_col_area">
                <h2>Address:</h2>
                <a>{data?.compStreetAddress}</a>
                <h2>Status:</h2>
                <h3>
                  <span>{data?.companyStatus}</span>
                </h3>
                <h2>Reg. Date:</h2>
                <p>
                  {data?.joinDate
                    ? moment(data.joinDate).format('DD-MMM-YYYY')
                    : 'N/A'}
                </p>
                <h2>Modified Date:</h2>
                <p>
                  {data?.joinDate
                    ? moment(data.joinDate).format('DD-MMM-YYYY')
                    : 'N/A'}
                </p>
                <h2>Contact Number:</h2>
                <a href={`tel:${data?.compHelpDeskNumber}`}>
                  {data?.compHelpDeskNumber}
                </a>
                <h2>Mail Address</h2>
                <a href={`mailto:${data?.compEmailId}`}>{data?.compEmailId}</a>
                <button onClick={onContact} className="btn-ezy btn-ezy-primary">
                  Contact Us First 30min Free Consultation
                </button>
                <h5>T's & C's Apply</h5>
              </div>
            </div>
            {/* Google Map */}
            <div className="search_result_map">
              <iframe
                src={`https://www.google.com/maps?q=${data?.compStreetAddress}&output=embed`}
                width="100%"
                height="290"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
            <div className="search_result_detail_right_col">
              <h4>Categories Speacialise In</h4>
              <div className="search_result_detail_right_col_area view_more_area">
                {subCategoryList?.map((category) => (
                  <a
                    onClick={(e) =>
                      handleClickCategory(e, category?.categoryId)
                    }
                    key={category?.categoryId}
                  >
                    {category?.categoryName}
                  </a>
                ))}
                {/* <a href="#" id="seeMore">
                  Show More
                </a> */}
              </div>
            </div>
            <div className="search_result_detail_right_col">
              <h4> Rating</h4>
              <div className="search_result_detail_right_col_area percentage_bar">
                {/* <!--Start Animated Progress Bar--> */}
                <div className="percentage_bar_col">
                  <h3>Excellent</h3>
                  <ProgressBar
                    variant="danger"
                    now={excellent}
                    label={`${Math.ceil(excellent)}%`}
                  />
                </div>
                <div className="percentage_bar_col">
                  <h3>Very Good</h3>
                  <ProgressBar
                    variant="danger"
                    now={verygood}
                    label={`${Math.ceil(verygood)}%`}
                  />
                </div>
                <div className="percentage_bar_col">
                  <h3>Good</h3>
                  <ProgressBar
                    variant="danger"
                    now={good}
                    label={`${Math.ceil(good)}%`}
                  />
                </div>
                <div className="percentage_bar_col">
                  <h3>Average</h3>
                  <ProgressBar
                    variant="danger"
                    now={average}
                    label={`${Math.ceil(average)}%`}
                  />
                </div>
                <div className="percentage_bar_col">
                  <h3>Poor</h3>
                  <ProgressBar
                    variant="danger"
                    now={poor}
                    label={`${Math.ceil(poor)}%`}
                  />
                </div>
                {/* <!--End Animated Progress Bar--> */}
              </div>
            </div>
            <div className="search_result_detail_right_col">
              <h4>Reviews</h4>
              <div className="search_result_detail_right_col_area">
                {reviews.slice(0, 3).map((review: any, index: number) => (
                  <div className="review_col" key={index}>
                    <h2>{review?.userName}</h2>
                    <h3>{review?.title}</h3>
                    <p>{review?.review}</p>
                    <h5>{moment(review?.dateofReview).format('MM/DD/YYYY')}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Container className="contact-us">
        <Row className="heading">
          <h2>LAW CATEGORIES ATTORNEY FIRMS</h2>
        </Row>
        <Row
          className="catergory_menu justify-content-center"
        >
          <ul id="myListBottom">
            { lawCategories.map((category: any) => (
              <li key={category.postID}>
                <a href={`/lawyers/attorney-category/${category.postID}`}>
                  {category.title}
                </a>
              </li>
            )) }
          </ul>
        </Row>
      </Container>
      <QuestionModal
        show={questionModalShow}
        toggle={setQuestionModalShow}
        companyId={data?.companyId}
        title="Contact Attorney"
      />
    </Container>
  )
}

export default Detail
