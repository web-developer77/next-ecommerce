import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect';
import DatePicker from 'react-datepicker'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import productsService from '@services/productsService'
import { GetPrdShoppingCart_getPrdShoppingCart } from '@services/productsService/__generated__/GetPrdShoppingCart'
import { makeSelectCartList } from '@views/containers/HomePage/selectors'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { setCartList } from '@views/containers/HomePage/homePageSlice'
import { Loading } from '@views/elements'
import Pagination from '@views/elements/pagination'
import LoginRegisterModal from '../LoginRegisterModal'
import authService from '@services/authService'
import { useToasts } from 'react-toast-notifications'
import { useCookies } from 'react-cookie'
import { categoryData } from '@views/lib/constants'
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_KEY)

const actionDispatch = (dispatch: Dispatch) => ({
  setCartList: (cart: GetPrdShoppingCart_getPrdShoppingCart) =>
    dispatch(setCartList(cart)),
})

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const stateSelector = createSelector(makeSelectCartList, (cartList) => ({
  cartList,
}))

const CartSection = (props: any) => {
  const { _cartList } = props
  const router = useRouter()
  const { addToast } = useToasts()
  const { setCartList } = actionDispatch(useAppDispatch())
  const { cartList } = useAppSelector(stateSelector)
  const [cartItemList, setCartItemList] = useState<any>({})
  const { registeredUser } = useAppSelector(referenceSelector)
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false)
  const [triggerAction, setTriggerAction] = useState<string>('')
  const [startDate, setStartDate] = useState<any>([{}]);
  const [endDate, setEndDate] = useState<any>([{}]);
  const [vaildStartDate, setVaildStartDate] = useState<boolean>(false)
  const [vaildEndDate, setVaildEndDate] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1)
  const [cookies, setCookie, removeCookie] = useCookies(['EzyFind_UID', 'EzyFind_Contract'])

  const getPrdShoppingCart = async (page: number) => {
    setLoading(true)
    const result = await productsService
      .getPrdShoppingCart(20, page)
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    if (result) {
      setCartList(result)
    }
  }

  const utilsCounter = (itemIndex: number, count: number) => {
    let obj = cartList;
    if (obj?.result?.prdShoppingCartDto) {
      let temp = obj?.result?.prdShoppingCartDto[itemIndex];
      let check = {
        ...temp,
        quantity: count,
      }
      let rest = obj?.result?.prdShoppingCartDto.map((item: any, index: number) => index !== itemIndex);
    }
  }
  // categoryID: 9
  // categoryName: "Property"
  // description: "Power of Attorney empowering an attorney to act on behalf of a client in selling and registering a bond. "
  // productID: 29
  // productImage: "Legal_Product_Image\\D002.rtf PIC.png"
  // productName: "Power of Attorney to pass bond"
  // productNumber: "D002                                              "
  // quantity: 1
  // recordID: 2516
  // totalPrice: 0
  // unitCost: 0
  // __typename: "PrdShoppingCartDtoType"
  const decreaseValue = async (item: any) => {
    console.log("decreaseValue");
    setLoading(true)
    if (item.quantity > 1) {
      let token = localStorage.getItem('token')
      const result = await productsService
        .postPrdShoppingCart({
          recordId: item.recordID,
          quantity: item.quantity - 1,
          userId: null,
          sessionId: token,
          productId: item.productID,
          dateCreated: new Date(),
          fromDate: startDate,
          endDate: endDate
        })
        .catch((err) => {
          console.log('Error', err)
        })
      setLoading(false)
      if (result) {
        setCartItemList(result)
      }
    }
  }
  const increaseValue = async (item: any) => {
    console.log("increaseValue", item);
    setLoading(true)
    let token = localStorage.getItem('token')
    const result = await productsService
      .postPrdShoppingCart({
        recordId: item.recordID,
        quantity: item.quantity + 1,
        userId: null,
        // sessionId: null,
        productId: item.productID,
        dateCreated: new Date(),
        fromDate: new Date(item.fromDate),
        endDate: new Date(item.endDate)
      })
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)

    if (result) {
      console.log("success", result)
      getPrdShoppingCart(1);
      setCartItemList(result)
    }
  }

  const changeStartDate = async (item: any, data: Date) => {
    setLoading(true)
    let token = localStorage.getItem('token')
    const result = await productsService
      .postPrdShoppingCart({
        recordId: item.recordID,
        quantity: item.quantity,
        userId: null,
        // sessionId: null,
        productId: item.productID,
        dateCreated: new Date(),
        fromDate: data,
        endDate: new Date(item.endDate)
      })
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)

    if (result) {
      console.log("success", result)
      getPrdShoppingCart(1);
      setCartItemList(result)
    }
  }

  const changeEndDate = async (item: any, data: Date) => {
    setLoading(true)
    let token = localStorage.getItem('token')
    const result = await productsService
      .postPrdShoppingCart({
        recordId: item.recordID,
        quantity: item.quantity,
        userId: null,
        // sessionId: null,
        productId: item.productID,
        dateCreated: new Date(),
        fromDate: new Date(item.endDate),
        endDate: data
      })
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)

    if (result) {
      console.log("success", result)
      getPrdShoppingCart(1);
      setCartItemList(result)
    }
  }

  useEffect(() => {
    console.log('_cartList', _cartList)
    if (_cartList) {
      setCartList(_cartList)
    } else {
      getPrdShoppingCart(1)
    }
    removeCookie('EzyFind_UID', {
      path: '/',
      domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
    })
    removeCookie('EzyFind_Contract', {
      path: '/',
      domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
    })
  }, [])

  useEffect(() => {
    // if(_cartList)
    setCartItemList(cartList)
  }, []);

  const handleChangePage = (page: number) => {
    getPrdShoppingCart(page)
  }
  // const totalPrice =
  // cartList?.result?.prdShoppingCartDto.map((e) => e?.totalPrice).reduce((a, b) => a + b, 0) || 0

  /* Empty Cart */
  const handleEmptyCart = async () => {
    setLoading(true)
    const result = await productsService
      .postPrdShoppingCart({
        recordId: 0,
        userId: null,
        sessionId: null,
        quantity: 0,
        productId: null,
        dateCreated: new Date().toISOString(),
        fromDate: null,
        endDate: null
      })
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    if (result) {
      addToast('Successfully empty cart!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setCartList({
        count: 0,
        currentPage: 0,
        message: '0 products',
        nextPage: 0,
        prevPage: 0,
        result: null,
        // success: true,
        // totalPages: 0,
        // __typename: 'ResponsePrdShoppingCartDto',
        __typename: 'ResponsePrdShoppingCartTotalDto',
      })
    }
  }

  const handleDeleteCart = (recordID: any) => {
    setLoading(true)
    productsService.deletePrdShoppingCartNew(recordID)
      .then((res: any) => {
        console.log('checking')
        console.log(res)
        setLoading(false);
        getPrdShoppingCart(1);
      })
      .catch((err) => {
        setLoading(false);
        console.log('error !!!')
      })

    // setCartList({
    //   count: 0,
    //   currentPage: 0,
    //   message: '0 products',
    //   nextPage: 0,
    //   prevPage: 0,
    //   result: null,
    //   __typename: 'ResponsePrdShoppingCartTotalDto',
    // })
  }

  /* Download */
  const handleDownload = async () => {
    setTriggerAction('')
    const result = await productsService
      .purchaseShoppingCartAsync(1)
    if (result?.success) {
      addToast('Successfully purchase cart!', {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    // redirect...
    const session = await authService.getSession(1)
    if (session?.sessionKeyLogin) {
      setCookie('EzyFind_UID', cryptr.encrypt(session.sessionKeyLogin), {
        path: '/',
        expires: new Date(Date.now() + 120 * 60 * 1000),
        domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
      })
      setCookie('EzyFind_Contract', cryptr.encrypt('Contract'), {
        path: '/',
        expires: new Date(Date.now() + 120 * 60 * 1000),
        domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
      })
      window.location.assign('https://individual.lawyersezyfind.co.za')
    } else {
      addToast('Failed to get session', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  /* Pay Now */
  const handlePayNow = async () => {
    setTriggerAction('')
    const result = await productsService
      .purchaseShoppingCartAsync(1)
    if (result?.success) {
      addToast('Successfully purchase cart!', {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    // payfast...
    const session = await authService.getSession(1)
    if (session?.sessionKeyLogin) {
      setCookie('EzyFind_UID', cryptr.encrypt(session.sessionKeyLogin), {
        path: '/',
        expires: new Date(Date.now() + 120 * 60 * 1000),
        domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
      })
      setCookie('EzyFind_Contract', cryptr.encrypt('Contract'), {
        path: '/',
        expires: new Date(Date.now() + 120 * 60 * 1000),
        domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
      })
      let payfastUrl = 'https://sandbox.payfast.co.za/eng/process?'
      payfastUrl += `merchant_id=${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID}`
      payfastUrl += `&merchant_key=${process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY}`
        ; (payfastUrl += `&return_url=http://28d4-182-75-32-182.ngrok.io/lawyers/payment/success`), // https://business.LawyersEzyFind.co.za`
          // ; (payfastUrl += `&return_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/success`), // https://business.LawyersEzyFind.co.za`
          (payfastUrl += `&cancel_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/cancel`)
      payfastUrl += `&notify_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/notify`
      payfastUrl += `&m_payment_id=13184`
      payfastUrl += `&amount=${cartList?.result?.totalAmount?.toFixed(2) || null}`
      payfastUrl += `&item_name=Company+9`
      payfastUrl += `&item_description=Purchased+EzyFindMobileApi.Model.MstPackage+Package`
      payfastUrl += `&subscription_type=3`
      window.location.assign(payfastUrl)
    } else {
      addToast('Failed to get session', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  useEffect(() => {

    const callToAction = async () => {
      const session = await authService.getSession(1);
      if (session) {
        setLoginModalShow(false)
        switch (triggerAction) {
          case 'download':
            handleDownload()
            break
          case 'paynow':
            handlePayNow()
            break
          default:
            break
        }
      } else {
        setLoginModalShow(true)
      }
    }
    if (triggerAction !== '') {
      callToAction();
    }
  }, [triggerAction, registeredUser])

  const cartList1 = cartList;
  return (
    <Container className="cart">
      {loading ? (
        <Loading />
      ) : cartList?.count ? (
        <Row>
          <Col sm={9} xs={12}>
            <div className="cart-wrap">
              <div className="cart_header clearfix">
                <div className="shipping_btt shipping_btt_add shipping_btt_add_d">
                  <Link href="/listing">
                    <button className="btn-ezy btn-ezy-secondary btn-ezy-round">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
                <div className="item_info">
                  <span id="lblRecordCount">
                    You have {cartList?.count} items in your cart
                  </span>
                </div>
                <div className="btt_sec clearfix">
                  <div className="shipping_btt shipping_btt_add shipping_btt_add_m">
                    <Link href="/listing">
                      <button className="btn-ezy btn-ezy-secondary btn-ezy-round">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                  <button
                    className="btn-ezy btn-ezy-primary btn-ezy-round"
                    onClick={handleEmptyCart}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
              <div className="cart_item_col_page">
                {cartList?.result?.prdShoppingCartDto?.map((item: any, index: any) => (
                  <div className="cart_item_col clearfix" key={index}>
                    <div className="cart_item_image">
                      <Link href={`/${categoryData.name}/product/${item?.productID}`}>
                        <img
                          src={`${item?.productImage
                            ? process.env.NEXT_PUBLIC_DOCUMENT_URL +
                            item.productImage.replace(/\\/g, '/')
                            : '/assets/img/company-image.webp'
                            }`}
                          alt={item?.productName || ''}
                          className="cart_item_image_link"
                        />
                      </Link>
                    </div>
                    <div className="cart_item_details">
                      <h2>
                        {item?.productName}{' '}
                        {item?.quantity &&
                          item.quantity > 1 &&
                          `(${item.quantity})`}
                      </h2>
                      <p>{item?.description}</p>
                      <h3>
                        R{(item?.totalPrice || 0).toFixed(2)} - FREE download
                      </h3>
                    </div>
                    <button
                      style={{ width: '20px', height: '20px', display: 'flex', position: 'absolute', right: '10px', border: 'none', backgroundColor: '#ba0a1b', color: '#fff' }}
                      onClick={() => handleDeleteCart(item?.recordID)}
                    >
                      X
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <form style={{ marginBottom: '50px', marginTop: '50px', marginRight: '40px' }}>
                        <div className="product-bid-ammount-form-box">
                          <span
                            className="quantity-button quantity-button-decrease"
                            id="decrease"
                            onClick={() => decreaseValue(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="quantity-button quantity-button-increase"
                            id="increase"
                            onClick={() => increaseValue(item)}
                          >
                            +
                          </span>
                        </div>
                      </form>
                      {item.prdProduct.salesTypeId == 3 && <>
                        {item.startDate}
                        <form style={{ marginBottom: '50px', marginRight: '40px' }}>
                          <div className="product-bid-ammount-form-box">
                            <Row>
                              <Col>
                                <DatePicker
                                  placeholderText="Start Date"
                                  selected={new Date(item.fromDate)}
                                  onChange={(date: Date) => {
                                    setVaildStartDate(false)
                                    setStartDate([{ index: index, date: date }])
                                    changeStartDate(item, date)
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
                                  selected={new Date(item.endDate)}
                                  onChange={(date: Date) => {
                                    setVaildEndDate(false)
                                    setEndDate([...endDate, { index: index, date: date }])
                                    changeEndDate(item, date)
                                  }}
                                  popperClassName="hire-date-range"
                                  popperPlacement="top-end"
                                  minDate={startDate.find((item: any) =>
                                    item.index === index
                                  )?.date || new Date()}
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
                      </>}

                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* {cartList?.count > 10 ? (
              <Row className="justify-content-center">
                <Pagination
                  data={cartList}
                  onChange={handleChangePage}
                  loading={loading}
                />
              </Row>
            ) : null} */}
          </Col>
          <Col md={3} xs={12}>
            <div className="cart-order-sec">
              <h2>Your Cart Total</h2>
              <p>
                <span id="lblTotalCost">R{cartList?.result?.totalAmount.toFixed(2) || null}</span>
              </p>
              <h2>Vat Amount</h2>
              <span>R {cartList?.result?.vatAmount.toFixed(2) || null}</span>
              <h2>Recurring Amount</h2>
              <span >R {cartList?.result?.recuringAmount.toFixed(2) || null}</span>
              <h4 style={{ marginTop: '30px' }} className="cart-order-desc">
                {cartList?.result?.totalAmount ? 'Pay - today only' : 'FREE - today only'}
              </h4>
              <p></p>
              <div className="checkout_btt">
                {cartList?.result?.totalAmount ? (
                  <button
                    className="btn-ezy btn-ezy-primary btn-ezy-round"
                    onClick={() => {
                      setTriggerAction('paynow')
                      // setLoginModalShow(true)
                    }}
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className="btn-ezy btn-ezy-primary btn-ezy-round"
                    onClick={() => {
                      setTriggerAction('download')
                      // setLoginModalShow(true)
                    }}
                  >
                    Download Now
                  </button>
                )}
              </div>
            </div>
            <div className="secure-payment">
              <i className="fa fa-lock mr-2"></i>Secure Download
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm={12}>
            <div className="empty-cart">
              <h2>Your shopping cart is empty</h2>
              <p>
                You can browse through the legal products{' '}
                <Link href="/listing">here</Link>
              </p>
            </div>
          </Col>
        </Row>
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>You have already added Product in Cart.</Modal.Body>
        <Modal.Footer>
          <Link href="/listing">
            <button className="btn-ezy btn-ezy-secondary btn-ezy-round">
              Continue Shopping
            </button>
          </Link>
          <button className="btn-ezy btn-ezy-primary btn-ezy-round">
            Go to Checkout
          </button>
        </Modal.Footer>
      </Modal>
      {loginModalShow && (
        <LoginRegisterModal show={loginModalShow} toggle={setLoginModalShow} />
      )}
    </Container>
  )
}

export default CartSection
