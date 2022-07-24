/* Product Component
Product Sales Type : @salesTypeID
1 Purchase, 
2 Bid, 
3 Hire

Product Type : @typeID
1 Physical, 
2 Digital
4 Service
*/
import React, { useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { Dispatch } from "redux";
import { useAppDispatch } from "@redux/hooks";
import { GetProducts_getPrdProductList_result } from "@services/productsService/__generated__/GetProducts";
import { GetPrdShoppingCart_getPrdShoppingCart } from "@services/productsService/__generated__/GetPrdShoppingCart";
import { Ratings, Toast } from "../elements";
import DatePicker from "react-datepicker";
import productsService from "@services/productsService";
import { setCartList } from "@views/containers/HomePage/homePageSlice";
import { LoginRegisterModal } from "@views/components";
import { useToasts } from "react-toast-notifications";
import { formatPrice } from "@views/lib/helper";
import { categoryData } from "@views/lib/constants";
import "react-datepicker/dist/react-datepicker.css";

//16-06-2022 Newly Added 
import { Loading } from '@views/elements'

const actionDispatch = (dispatch: Dispatch) => ({
  setCartList: (cart: GetPrdShoppingCart_getPrdShoppingCart) =>
    dispatch(setCartList(cart)),
});

interface IProductProps {
  product: GetProducts_getPrdProductList_result | null;
}

const Product = (props: IProductProps) => {
  let isoDate = new Date();
  let hours: any;
  let minutes: any;
  let seconds: any;
  let days: any;
  let delta: number;
  const { addToast, removeAllToasts } = useToasts();
  const { setCartList } = actionDispatch(useAppDispatch());

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

  const product = props.product;
  if (!product) return null;

  const salesType = product.salesTypeId;
  const type = product.typeID;

  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /* Hire */
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
  const [timeee, setTime] = useState<any>(null);

  const gettimes = (data: any) => {
    // console.log("data is++",data)

    delta = Math.abs(new Date(data).getTime() - isoDate.getTime()) / 1000;
    // console.log("delta is++",delta)

    days = Math.floor(delta / 86400);
    // console.log("days is++",days)

    delta-= days * 86400;
    hours = Math.floor(delta / 3600) % 24;
    // console.log("hours is+++",hours)

    delta-= hours * 3600;
    minutes = Math.floor(delta / 60) % 60;
    // console.log("minutes is ++",minutes)

    // let today= new Date();
    // let seconds = today.getSeconds();
    // console.log("seconds is +++",seconds)

    delta-= minutes * 60;
    seconds = Math.floor(delta % 60);
    console.log("seconds++",seconds)
    return `${days}:${hours}:${minutes}:${seconds}`;
  };
  useEffect(() => {
    if (startDate && endDate) {
      setDiffDays(
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [startDate, endDate]);
  useEffect(() => {
    gettimes(product.endDate ? product.endDate : "");
    setInterval(() => {
      if (seconds < 1) {
        seconds = 59;
        minutes = parseInt(minutes) - 1;
      } else if (minutes < 0) {
        minutes = 59;
        hours = parseInt(hours) - 1;
      } else {
        seconds = parseInt(seconds) - 1;
      }
      setTime(`${days}:${hours}:${minutes}:${seconds}`);
    },1000);
  }, [props]);

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

  /* Purchase */
  const [count, setCount] = useState<number>(1);

  //16-06-2022  Newly Added
  const[loadingbutton,setLoadingButton] = useState<boolean>(false);
  const[loadingbuybutton,setLoadingBuyButton] =useState<boolean>(false);

  const handleAddCart = async () => {
    setLoadingButton(true)
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
      dateCreated: new Date(),
      fromDate: startDate,
      endDate: endDate,
    });
    // console.log(result);
    if (result) {
      setTimeout(() => getPrdShoppingCart(), 1000);
    }
    setLoadingButton(false)
  };
  const handleBuyNow = async () => {
    setLoading(true);
    setLoadingBuyButton(true)
    const result = await productsService.postPrdShoppingCart({
      recordId: null,
      userId: null,
      sessionId: null,
      quantity: count,
      productId: product.productID,
      dateCreated: new Date(),
    });
    setLoadingBuyButton(false)
    // console.log(result);
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

  /* Bid */
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
          setLoginModalShow(true);
        }
      });
    console.log(result);
    if (result) {
      addToast("Successfully bid!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };
  const handleIncreaseBidAmount = (e: any) => {
    e.preventDefault();
    const newAmount = increaseBidAmount + (lastBid?.bidAmount || 0) * 0.1;
    setIncreaseBidAmount(newAmount);
    // handleBidNow(newAmount)
    setHide10(false);
    setTimeout(() => setHide10(true), 3000);
  };

  /* Rating */
  const handleRating = async (rating: number) => {
    console.log(rating);
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
          // alert("Please login");
          setLoginModalShow(true);
        }
      });
    console.log(result);
    if (result) {
      addToast("Successfully rated!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  /* favourite */
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
    if (result) {
      addToast("Successfully favorited!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="product-sub-category-item" style={{ border: "1px solid" }}>
      <div className="product-image">
        <Link
          /* href={`/${categoryData.name}/product/${
            product.productID
              ? product.productID
              : product.eflyerId
              ? `${product.eflyerId}?mag=1`
              : product.specialID
              ? `${product.specialID}?special=1`
              : ''
          }`} */
          href={`/${categoryData.name}/product/${product?.productID}`}
        >
          <img
            /* src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(product.productImage
              ? product.productImage
              : product.mapEflyersUploadDtos
              ? product.mapEflyersUploadDtos[0].filePath
              : product.mapSpecialUpload
              ? product.mapSpecialUpload.length > 0
                ? product.mapSpecialUpload[0].thumbNailPath
                : product.mapProductImages
                ? product.mapProductImages[0].imagePath
                : ''
              : '' || ''
            ).replace(/\\/g, '/')}`} */
            src={`${process.env.NEXT_PUBLIC_DOCUMENT_URL}${(
              product.productImage || ""
            ).replace(/\\/g, "/")}`}
            className="img-responsive"
            alt=""
            width="288"
            height="170"
          />
        </Link>
        <span className="wishlist" onClick={handleFavourite}>
          <i className="fa fa-heart" aria-hidden="true"></i>
        </span>
      </div>
      <div className="product-description">
        <Link href={`/${categoryData.name}/product/${product?.productID}`}>
          {product.productName || ""}
        </Link>
        {!salesType && (
          <Link href={`/${categoryData.name}/product/${product?.productID}`}>
            {product.description || ""}
          </Link>
        )}
        {salesType == 2 && (
          <>
            <p>{timeee}</p>
            <p>D:HH:MM:SS</p>
          </>
        )}
        {salesType == 2 ? (
          <div className="product-short-info">
            <p className="product-bid-count">
              R {lastBid ? formatPrice(lastBid?.bidAmount) : 0.0}
              <span>Last bid</span>
            </p>
            <p
              className={
                hide10
                  ? "product-increase-count hidden"
                  : "product-increase-count"
              }
            >
              10% Increased
            </p>
          </div>
        ) : salesType == 1 ? (
          <div className="product-short-info">
            <p className="product-bid-count">
              R
              {formatPrice(
                product.unitCost ? product.unitCost * count : 0.0 * count
              )}
              <span>Amount</span>
            </p>
          </div>
        ) : !salesType ? (
          <div className="product-short-info">
            {product.unitCost ? (
              <p className="product-bid-count">
                R {formatPrice(product.unitCost ? product.unitCost : 0.0)}
              </p>
            ) : (
              <p className="product-bid-count"></p>
            )}
          </div>
        ) : (
          <div className="product-short-info">
            <p className="product-bid-count">
              R{formatPrice(product.unitCost ? product.unitCost : 0.0)}
              <span>Hire per day</span>
            </p>
            {diffDays ? (
              <p className="product-hire-detail">{`Days: ${diffDays}; Total: R${formatPrice(
                product.unitCost
                  ? product.unitCost * diffDays * count
                  : 1 * diffDays * count
              )}`}</p>
            ) : null}
          </div>
        )}

        <div className="product-bid-ammount-form">
          {salesType == 2 && (
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
                  aria-label="Submit Bid"
                  onClick={handleIncreaseBidAmount}
                >
                  <i className="icon-bid"></i>
                </button>
              </div>
            </form>
          )}
          {salesType == 1 || salesType == 3 || type == 4 ? (
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
            <></>
          )}

          {salesType == 3 && (
            <form>
              <div className="product-bid-ammount-form-box product-dates-box ">
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
            </form>
          )}
        </div>
        {salesType && (
          <Ratings
            score={product.ratingScore ? product.ratingScore : 0 || 0}
            onRating={handleRating}
          />
        )}
        <div className="product-button">
          {salesType == 1 && (
            <button
              className="btn-ezy btn-ezy-secondary w-50"
              onClick={handleBuyNow}
              aria-label="Buy Now"
              disabled={loading}
            >
              Buy Now{loadingbuybutton ? <Loading/>:""}
            </button>
          )}
          {(salesType == 1 || salesType == 3) && (
             
            <button
              className="btn-ezy btn-ezy-primary with-icon w-50"
              onClick={handleAddCart}
              aria-label="Add Cart"
            >
   {loadingbutton ? <Loading/>: <i className="icon-cart-full">Add Cart</i>}{}
            </button>
           
          )}
          {salesType == 3 && (
            <button
              className="btn-ezy btn-ezy-secondary w-50"
              onClick={() => handleHireNow()}
              aria-label="Hire Now"
            >
              Hire Now
            </button>
          )}
          {salesType == 2 && (
            <button
              className="btn-ezy btn-ezy-secondary with-icon"
              onClick={() => handleBidNow(increaseBidAmount)}
              aria-label="Bid Now"
            >
              Bid Now <i className="icon-bid"></i>
            </button>
          )}
        </div>
      </div>
      {/* {error && <Toast />} */}
      {loginModalShow && (
        <LoginRegisterModal show={loginModalShow} toggle={setLoginModalShow} />
      )}
    </div>
  );
};

export default Product;
