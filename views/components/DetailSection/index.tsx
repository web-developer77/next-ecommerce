import React, { useRef, useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import Slider from "react-slick";
import { Dispatch } from "redux";
import { useAppDispatch } from "@redux/hooks";
import { GetProducts_getPrdProductList_result } from "@services/productsService/__generated__/GetProducts";
import { GetPrdShoppingCart_getPrdShoppingCart } from "@services/productsService/__generated__/GetPrdShoppingCart";
import { Ratings, SocialShare,Loading } from "@views/elements";
import DatePicker from "react-datepicker";
import productsService from "@services/productsService";
import { setCartList } from "@views/containers/HomePage/homePageSlice";
import { useToasts } from "react-toast-notifications";
import LoginRegisterModal from "../LoginRegisterModal";
import QuestionModal from "@views/components/QuestionModal";
import { formatPrice } from "@views/lib/helper";
import "react-datepicker/dist/react-datepicker.css";

//16-06-2022 Newly Added
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const settings1 = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};
const settings2 = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

const actionDispatch = (dispatch: Dispatch) => ({
  setCartList: (cart: GetPrdShoppingCart_getPrdShoppingCart) =>
    dispatch(setCartList(cart)),
});

interface IDetailProps {
  product: GetProducts_getPrdProductList_result | null;
}

const DetailSection = (props: IDetailProps) => {
  const { addToast, removeAllToasts } = useToasts();
  const { setCartList } = actionDispatch(useAppDispatch());
  const product = props.product;
  if (!product) return null;
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [questionModalShow, setQuestionModalShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const salesType = product.salesTypeId;
  const type = product.typeID;

  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);
  const [_, setLoaded] = useState(false);
  useEffect(() => {
    if (slider1 && slider2) {
      setLoaded(true);
    }
  }, [slider1, slider2]);

  const getPrdShoppingCart = async () => {
    const result = await productsService.getPrdShoppingCart(10, 1);
    console.log(result);
    if (result) {
      removeAllToasts();
      addToast("Successfully added to shopping cart", {
        appearance: "success",
        autoDismiss: true,
      });
      setCartList(result);
    }
  };

  // Hire
  const lastHire = product.prdHire
    ? product.prdHire.slice().sort((a, b) => {
        if (!a?.hireId) return -1;
        if (!b?.hireId) return 1;
        return b.hireId - a.hireId;
      })[0]
    : null;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [vaildStartDate, setVaildStartDate] = useState<boolean>(false);
  const [vaildEndDate, setVaildEndDate] = useState<boolean>(false);
  const [diffDays, setDiffDays] = useState<Number | any>(0);

  useEffect(() => {
    if (startDate && endDate) {
      setDiffDays(
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [startDate, endDate]);

  const handleHireNow = async () => {
    if (salesType == 3) {
      let invaild = false;
      if (!startDate) {
        setVaildStartDate(true);
        invaild = true;
      }
      if (!endDate) {
        setVaildEndDate(true);
        invaild = true;
      }
      if (invaild) return;
    }
    const result = await productsService
      .createPrdHire({
        hireId: lastHire?.hireId || 1,
        userId: null,
        productId: product.productID,
        returned: null,
        returnedDate: null,
        isAccepted: null,
        businessConfirmedReturned: null,
        businessConfirmedReturnedDate: null,
        clientConfirmedReturned: null,
        clientConfirmedReturnedDate: null,
        fromDate: startDate,
        toDate: endDate,
        mstProvinces: null,
      })
      .catch((err) => {
        if (
          err.message?.includes("You are not authorized to run this mutation.")
        ) {
          // alert("Please login");
          setLoginModalShow(true);
        }
      });
    console.log(result);
    if (result) {
      setTimeout(() => getPrdShoppingCart(), 1500);
      router.push("/cart");
    }
  };

  // Purchase
  const [count, setCount] = useState<number>(1);

  // 16-06-2022 Newly Added Customer
  const [percentage, setPercentage] = useState(0);

  const handleAddCart = async () => {
    alert("hii");

    //16-06-2022 Newly Added
    setTimeout(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1);
      }
    }, 50);
    if (salesType == 3) {
      let invaild = false;
      if (!startDate) {
        setVaildStartDate(true);
        invaild = true;
      }
      if (!endDate) {
        setVaildEndDate(true);
        invaild = true;
      }
      if (invaild) return;
    }
    addToast("Adding to shopping cart. Please wait...", {
      appearance: "info",
      autoDismiss: false,
    });
    const result = await productsService.postPrdShoppingCart({
      recordId: null,
      userId: null,
      sessionId: null,
      quantity: count,
      productId: product.productID,
      dateCreated: new Date().toISOString(),
      fromDate: startDate,
      endDate: endDate,
    });
    if (result) {
      setTimeout(() => getPrdShoppingCart(), 1000);
    }
  };
  const handleBuyNow = async () => {
    setLoading(true);
    const result = await productsService.postPrdShoppingCart({
      recordId: null,
      userId: null,
      sessionId: null,
      quantity: count,
      productId: product.productID,
      dateCreated: new Date().toISOString(),
    });
    if (result) {
      setTimeout(() => getPrdShoppingCart(), 1500);
      router.push("/cart");
    }
  };
  const decreaseValue = () => {
    if (count > 1) setCount(count - 1);
  };
  const increaseValue = () => {
    setCount(count + 1);
  };

  // Bid
  const lastBid = product.prdBid
    ? product.prdBid.slice().sort((a, b) => {
        if (!a?.bidId) return -1;
        if (!b?.bidId) return 1;
        return b.bidId - a.bidId;
      })[0]
    : null;
  const [increaseBidAmount, setIncreaseBidAmount] = useState<number>(
    (lastBid?.bidAmount || 0) * 1.1
  );
  const [hide10, setHide10] = useState<Boolean>(true);
  const handleBidNow = async (amount?: number) => {
    const result = await productsService
      .createPrdBid({
        bidId: lastBid?.bidId || 1,
        userId: null,
        productId: product.productID,
        bidAmount: amount || increaseBidAmount,
        bidApprovedMail: null,
        isAccepted: null,
        isActive: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
        mstProvinces: null,
      })
      .catch((err) => {
        if (
          err.message?.includes("You are not authorized to run this mutation.")
        ) {
          // alert("Please login")
          setLoginModalShow(true);
        }
      });
    console.log(result);
  };
  const handleIncreaseBidAmount = (e: any) => {
    e.preventDefault();
    const newAmount = increaseBidAmount + (lastBid?.bidAmount || 0) * 0.1;
    setIncreaseBidAmount(newAmount);
    handleBidNow(newAmount);
    setHide10(false);
    setTimeout(() => setHide10(true), 3000);
  };

  // Rating
  const handleRating = async (rating: number) => {
    const result = await productsService
      .createMstRating({
        mstRatingId: null,
        companyId: null,
        specialId: null,
        eflyerId: null,
        userId: null,
        name: null,
        contactNo: null,
        emaiId: null,
        review: null,
        ratingScore: rating,
        statusId: null,
        productId: product.productID,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
        company: null,
        special: null,
        status: null,
        user: null,
      })
      .catch((err) => {
        if (
          err.message?.includes("You are not authorized to run this mutation.")
        ) {
          // alert("Please login")
          setLoginModalShow(true);
        }
      });
    console.log(result);
  };

  // favourite
  const handleFavourite = async () => {
    const result = await productsService
      .createMstFavourites({
        mstFavouriteId: product.productID || 1,
        companyId: null,
        productId: product.productID,
        specialId: null,
        eflyerId: null,
        userId: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
      })
      .catch((err) => {
        if (
          err.message?.includes("You are not authorized to run this mutation.")
        ) {
          // alert("Please login");
          setLoginModalShow(true);
        }
      });
    console.log(result);
  };

  // fastway api
  const handleCalculateShipping = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="product-details w-100">
      <Container fluid className="ezy-container">
        <Row className="product-specification clearfix">
          <Col md={5} xs={12}>
            <div className="product-specification-left-panel">
              <div className="product-specification-silder">
                <div className="thumbnail-zoom-slider slider-for">
                  <Slider
                    {...settings1}
                    ref={slider1}
                    asNavFor={slider2.current || undefined}
                  >
                    {product?.mapProductImages &&
                      product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-zoom-slider-img" key={index}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              e?.imagePath || ""
                            ).replace(/\\/g, "/")}`}
                            className="img-responsive"
                            alt={`thumbnail-zoom-slider-${index}`}
                            width="539"
                            height="432"
                          />
                        </div>
                      ))}
                    {
                      product?.mapProductImages && (
                        // product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-zoom-slider-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              product.mapProductImages[0]?.imagePath || ""
                            ).replace(/\\/g, "/")}`}
                            className="img-responsive"
                            alt={product.mapProductImages[0]?.imageName || ""}
                            width="539"
                            height="432"
                          />
                        </div>
                      )
                      // ))
                    }
                    {/* {
                      product?.mapSpecialUpload && (
                        // product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-zoom-slider-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              product.mapSpecialUpload[0]?.thumbNailPath || ''
                            ).replace(/\\/g, '/')}`}
                            className="img-responsive"
                            alt=""
                            width="539"
                            height="432"
                          />
                        </div>
                      )
                      // ))
                    } */}
                  </Slider>
                </div>
                <div className="thumbnail-slider slider-nav">
                  <Slider
                    {...settings2}
                    ref={slider2}
                    asNavFor={slider1.current || undefined}
                  >
                    {product?.mapProductImages &&
                      product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-slider-img" key={index}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              e?.imagePath || ""
                            ).replace(/\\/g, "/")}`}
                            className="img-responsive"
                            alt={`thumbnail-slider-${index}`}
                            width="133"
                            height="108"
                          />
                        </div>
                      ))}
                    {
                      product?.mapProductImages && (
                        // product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-zoom-slider-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              product.mapProductImages[0]?.imagePath || ""
                            ).replace(/\\/g, "/")}`}
                            className="img-responsive"
                            alt={product.mapProductImages[0]?.imageName || ""}
                            width="539"
                            height="432"
                          />
                        </div>
                      )
                      // ))
                    }
                    {/* {
                      product?.mapSpecialUpload && (
                        // product?.mapProductImages.map((e, index) => (
                        <div className="thumbnail-zoom-slider-img">
                          <img
                            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                              product.mapSpecialUpload[0]?.filePath || ''
                            ).replace(/\\/g, '/')}`}
                            className="img-responsive"
                            alt=""
                            width="539"
                            height="432"
                          />
                        </div>
                      )
                      // ))
                    } */}
                  </Slider>
                </div>
              </div>
            </div>
          </Col>
          <Col md={7} xs={12}>
            <div className="product-specification-right-panel">
              <div className="product-description">
                {product.productName && (
                  <Ratings
                    score={product?.ratingScore || 0}
                    onRating={handleRating}
                  />
                )}

                <p>{product?.productName || ""}</p>
                {product?.productName && (
                  <>
                    <div className="product-short-info">
                      {salesType == 1 ? (
                        <p className="product-bid-count">
                          R{formatPrice(product?.unitCost * count)}
                          <span>Amount</span>
                        </p>
                      ) : salesType == 2 ? (
                        <p className="product-bid-count">
                          R {lastBid ? formatPrice(lastBid?.bidAmount) : 0.0}
                          <span>Last bid</span>
                        </p>
                      ) : (
                        <p className="product-bid-count">
                          R{formatPrice(product?.unitCost)}
                          <span>Hire per day</span>
                        </p>
                      )}
                      {salesType == 1 && (
                        <button
                          className="btn-ezy btn-ezy-secondary ml-2"
                          onClick={handleBuyNow}
                          aria-label="Buy Now"
                          disabled={loading}
                        >
                          Buy Now
                        </button>
                      )}
                      {(salesType == 1 || salesType == 3) && (
                        <button
                          className="btn-ezy btn-ezy-primary with-icon"
                          onClick={handleAddCart}
                          aria-label="Add Cart"
                        >
                          Add Cart
                          <Loading/>
                          <i className="icon-cart-full"></i>
                        </button>
                      )}
                      {salesType == 3 && (
                        <button
                          className="btn-ezy btn-ezy-secondary mr-2"
                          onClick={() => handleHireNow()}
                          aria-label="Hire Now"
                        >
                          Hire Now
                        </button>
                      )}
                      {salesType == 2 && (
                        <button
                          className="btn-ezy btn-ezy-primary with-icon"
                          onClick={() => handleBidNow(increaseBidAmount)}
                          aria-label="Bid Now"
                        >
                          Bid Now <i className="icon-bid"></i>
                        </button>
                      )}
                    </div>
                    <div className="product-bid-ammount-form">
                      {salesType == 2 ? (
                        <form>
                          <div className="product-bid-ammount-form-box">
                            <input
                              type="text"
                              name="bid_ammount"
                              placeholder="Enter Bid Amount"
                              value={`R${formatPrice(increaseBidAmount)}`}
                              readOnly
                            />
                            <button
                              type="submit"
                              value=""
                              aria-label="Bid"
                              onClick={handleIncreaseBidAmount}
                            >
                              <i className="icon-bid"></i>
                            </button>
                          </div>
                          <p
                            className={
                              hide10
                                ? "product-increase-count hidden"
                                : "product-increase-count"
                            }
                          >
                            10% Increased
                          </p>
                        </form>
                      ) : salesType == 1 ? (
                        <form>
                          <div className="product-bid-ammount-form-box">
                            <span
                              className="quantity-button quantity-button-decrease"
                              id="decrease"
                              onClick={decreaseValue}
                            >
                              -
                            </span>
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={count}
                              readOnly
                            />
                            <span
                              className="quantity-button quantity-button-increase"
                              id="increase"
                              onClick={increaseValue}
                            >
                              +
                            </span>
                          </div>
                        </form>
                      ) : (
                        <form>
                          <div className="product-bid-ammount-form-box">
                            <Row>
                              <Col>
                                <DatePicker
                                  placeholderText="Start Date"
                                  selected={startDate}
                                  onChange={(date: Date) => {
                                    setVaildStartDate(false);
                                    setStartDate(date);
                                  }}
                                  popperClassName="hire-date-range"
                                  popperPlacement="top-end"
                                  minDate={new Date()}
                                  maxDate={endDate}
                                />
                                {vaildStartDate && (
                                  <span className="text-primary text-vaild">
                                    Enter Start Date
                                  </span>
                                )}
                              </Col>
                              <Col>
                                <DatePicker
                                  placeholderText="End Date"
                                  selected={endDate}
                                  onChange={(date: Date) => {
                                    setVaildEndDate(false);
                                    setEndDate(date);
                                  }}
                                  popperClassName="hire-date-range"
                                  popperPlacement="top-end"
                                  minDate={startDate || new Date()}
                                />
                                {vaildEndDate && (
                                  <span className="text-primary text-vaild">
                                    Enter End Date
                                  </span>
                                )}
                              </Col>
                            </Row>
                          </div>
                          {diffDays ? (
                            <p className="product-hire-detail">{`Days: ${diffDays}; Total: R${formatPrice(
                              product?.unitCost * diffDays
                            )}`}</p>
                          ) : null}
                        </form>
                      )}
                    </div>
                    <div className="end-section">
                      <p className="product-time">Ends 30 Apr 20 23:45</p>
                      <div className="end-section-left">
                        <span
                          className="cursor-pointer"
                          onClick={handleAddCart}
                        >
                          Add To Cart{" "}
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span
                          className="fav cursor-pointer"
                          onClick={handleFavourite}
                        >
                          Favourite{" "}
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => setOpenShare(!openShare)}
                          aria-controls="social-share"
                          aria-expanded={openShare}
                        >
                          Share{" "}
                          <i className="fa fa-share" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <Collapse in={openShare}>
                  <div id="social-share">
                    <SocialShare />
                  </div>
                </Collapse>
                <div className="item-seller-summary-block clearfix">
                  <div className="item-seller-summary-block-left">
                    <img
                      src="/assets/img/company-image.webp"
                      className="img-responsive"
                      alt="company-image"
                      width="49"
                      height="47"
                    />
                    <div className="left-box-content">
                      <h4>{product?.categoryName}</h4> {/* companyName */}
                      <p>
                        <span className="company-rating">97.50%</span>
                        <span className="very">
                          Verified By:{" "}
                          <span className="very-name">EZYFIND</span>
                        </span>
                      </p>
                    </div>
                    <div className="right-box-content">
                      <span
                        className="btn-seller cursor-pointer"
                        onClick={() => setQuestionModalShow(true)}
                      >
                        <img
                          src="/assets/img/info-icon.webp"
                          className="img-responsive"
                          alt="info-icon"
                          width="8"
                          height="17"
                        />{" "}
                        Ask the seller a question
                      </span>
                    </div>
                  </div>
                </div>
                {type === 1 && (
                  <>
                    <div className="shipping-option clearfix">
                      <h3 className="shipping">
                        <img
                          src="/assets/img/shipping-icon.webp"
                          alt="shipping-icon"
                          width="26"
                          height="18"
                        />{" "}
                        Shipping
                      </h3>
                      <h3 className="powered">
                        Powered By:{" "}
                        <img
                          src="/assets/img/powered-image.webp"
                          alt="powered-image"
                          width="73"
                          height="23"
                        />
                      </h3>
                    </div>
                    <div className="shipping-option-count clearfix">
                      <p>
                        <img
                          src="/assets/img/check-icon.webp"
                          alt="check-icon"
                          width="14"
                          height="13"
                        />
                        <span>$10</span> To Lorem Lipsum
                      </p>
                      <span className="btn-view-option">View Options</span>
                    </div>
                    <div className="product-calculation clearfix">
                      <form onSubmit={handleCalculateShipping}>
                        <div className="product-calculation-box sur-box">
                          <input type="text" name="ss" placeholder="Suburb" />
                        </div>
                        <div className="product-calculation-box postal-box">
                          <input
                            type="text"
                            name="postal_code"
                            placeholder="Postal Code"
                          />
                        </div>
                        <div className="product-calculation-box btn-calculation">
                          <button
                            type="submit"
                            className="btn-ezy btn-ezy-primary"
                            aria-label="Calculate"
                          >
                            Calculate
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
                {!product?.productName && product?.mapProductImages && (
                  <>
                    <p>Documents</p>
                    <div
                      onClick={() => {
                        window.open(
                          `${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
                            (product.mapProductImages &&
                              product.mapProductImages[1]?.imagePath) ||
                            ""
                          ).replace(/\\/g, "/")}`
                        );
                      }}
                    >
                      <img
                        src="/assets/img/document.webp"
                        className=""
                        alt="document"
                        width="20"
                        height="20"
                      />
                    </div>
                  </>
                )}
                <div className="payment-option">
                  <h3>
                    <img
                      src="/assets/img/payment-icon.webp"
                      className=""
                      alt="payment-icon"
                      width="20"
                      height="20"
                    />{" "}
                    Payments
                  </h3>
                  <Row>
                    <Col xs={4}>
                      <div className="payment-option-box">
                        <img
                          src="/assets/img/payfast-icon.webp"
                          className="img-responsive"
                          alt="payfast-icon"
                          width="140"
                          height="42"
                        />
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="payment-option-box">
                        <img
                          src="/assets/img/paygate-icon.webp"
                          className="img-responsive"
                          alt="paygate-icon"
                          width="196"
                          height="48"
                        />
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="payment-option-box">
                        <img
                          src="/assets/img/paypal-iacon.webp"
                          className="img-responsive"
                          alt="paypal-iacon"
                          width="159"
                          height="49"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {loginModalShow && (
        <LoginRegisterModal show={loginModalShow} toggle={setLoginModalShow} />
      )}
      {questionModalShow && (
        <QuestionModal
          show={questionModalShow}
          toggle={setQuestionModalShow}
          companyId={null}
          title="Ask the seller"
        />
      )}
    </section>
  );
};

export default DetailSection;
