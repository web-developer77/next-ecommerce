import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import {
  setCityList,
  setSuburbList,
  setPackageList,
  setPackageDetailList,
} from '@views/containers/Reference/ReferenceSlice'
import authService from '@services/authService'
import referenceService from '@services/referenceService'
import { Empty, Loading } from '@views/elements'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { GetMstPackageList_getMstPackageList_result } from '@services/authService/__generated__/GetMstPackageList'
import { GetMstPackageDetailList_getMstPackageDetailList_result } from '@services/authService/__generated__/GetMstPackageDetailList'
import { useCookies } from 'react-cookie'
import { formatPrice } from '@views/lib/helper'
import { useToasts } from 'react-toast-notifications'
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_KEY)

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const actionDispatch = (dispatch: Dispatch) => ({
  setPackageList: (data: GetMstPackageList_getMstPackageList_result[]) =>
    dispatch(setPackageList(data)),
  setPackageDetailList: (
    data: GetMstPackageDetailList_getMstPackageDetailList_result[],
  ) => dispatch(setPackageDetailList(data)),
  setCityList: (data: GetCity_getCity_result[]) => dispatch(setCityList(data)),
  setSuburbList: (data: GetSuburb_getSuburb_result[]) =>
    dispatch(setSuburbList(data)),
})

const discount: any = {
  '1': 0,
  '3': 5,
  '6': 10,
  '12': 15,
}

const PlanSection = (props: any) => {
  const { _packageList } = props
  const router = useRouter()
  const { addToast } = useToasts()
  const {
    setPackageList,
    setPackageDetailList,
    setCityList,
    setSuburbList,
  } = actionDispatch(useAppDispatch())
  const {
    packageList,
    packageDetailList,
    subCategoryList,
    provinceList,
    cityList,
    suburbList,
  } = useAppSelector(referenceSelector)

  const [months, setMonths] = useState<number>(1)
  const [step, setStep] = useState<number>(1)
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  )
  const [companyName, setCompanyName] = useState<string>('')
  const [companyValid, setCompanyValid] = useState<string>('')
  const [subCategoryId, setSubCategoryId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [mobileValid, setMobileValid] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [suburb, setSuburb] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['EzyFind_UID', 'EzyFind_Contract'])

  const getPackageDetailList = async (
    packageId: number | null,
    status: boolean | null,
  ) => {
    const result = await authService.getMstPackageDetailList(packageId, status)
    setPackageDetailList(result)
  }

  const getPackageList = async () => {
    setPackageList(_packageList)
    _packageList.forEach((e: any) => {
      getPackageDetailList(e.packageID, e.isActive)
    })
  }

  useEffect(() => {
    if (!packageList || !packageList.length) getPackageList()
    else if (!packageDetailList || !packageDetailList.length) {
      packageList.forEach((e) => {
        getPackageDetailList(e.packageID, e.isActive)
      })
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
    if (packageList?.length) {
      setSelectedPackageId(3)
    }
  }, [packageList])

  if (!packageList || !packageDetailList) return <Loading />
  if (!packageList.length) return <Empty text="No package" />
  const packages = packageList
    .filter((pkg) => pkg?.amount)
    .sort((a, b) => (a?.sortOrder || 0) - (b?.sortOrder || 0))
    .map((pkg) => ({
      ...pkg,
      detail: [
        ...packageDetailList.filter((e) => e.packageID === pkg.packageID),
      ],
    }))

  const fetchCityListByProvinceId = async (provinceId: number) => {
    setCityList([])
    const result = await referenceService.getCityListByProvinceId(provinceId)
    if (result) {
      setCityList(result)
    }
  }

  const fetchSuburbListByCityId = async (cityId: number) => {
    setSuburbList([])
    const result = await referenceService.getSuburbListByCityId(cityId)
    if (result) {
      setSuburbList(result)
    }
  }

  const handleChangeProvince = (e: any) => {
    setProvince(e.target.value)
    fetchCityListByProvinceId(Number(e.target.value))
  }

  const handleChangeCity = (e: any) => {
    setCity(e.target.value)
    fetchSuburbListByCityId(Number(e.target.value))
  }

  const renderPrice = (amount: number) => {
    return {
      originPrice: formatPrice(amount * months),
      offPrice: formatPrice(
        (amount * months * (100 - discount[months.toString()])) / 100,
      ),
      discount: formatPrice(
        (amount * months * discount[months.toString()]) / 100,
      ),
      vat: formatPrice((amount * months * 15) / 100),
      total: formatPrice(
        (amount * months * (115 - discount[months.toString()])) / 100,
      ),
    }
  }

  const renderPackageDetail = (detail: any) => {
    if (detail.attributeName === 'Time Delay') {
      return `${detail.value} HR${Number(detail.value) > 1 && 'S'} ${
        detail.attributeName
      }`
    }
    switch (detail.value) {
      case 'All':
        return detail.attributeName
      case '-1':
        return `Unlimited ${detail.attributeName}`
      default:
        return `${detail.value} ${detail.attributeName}`
    }
  }

  /* Step 2 */
  const handleSubmitRegister = async (e: any) => {
    e.preventDefault()

    // password vaild
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(password)) {
      setPwdValid('Include one capital letter and one number or more')
      return
    }
    if (repeatPassword && password && password !== repeatPassword) {
      setPwdValid('Not matched Password')
      return
    }
    setPwdValid('')

    // mobile vaild
    if (
      !mobileNumber.match(/^(\+\d{1,3}[- ]?)?\d{9}$/) ||
      mobileNumber.match(/0{5,}/)
    ) {
      setMobileValid('Invaild Mobile Number')
      return
    }
    setMobileValid('')

    // companyCheck
    const result = await authService.companyCheck(companyName)
    console.log(result)
    if (result?.result !== 'true') {
      addToast(result?.message || 'Company Name already exists', {
        appearance: 'error',
        autoDismiss: true,
      })
      setCompanyValid(result?.message || 'Company Name already exists')
      return
    }
    setCompanyValid('')

    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setEmailValid(result1.message)
      return
    }
    setEmailValid('')

    // mobileCheck
    const result2 = await authService.mobileCheck(mobileNumber)
    console.log(result2)
    if (result2?.result !== 'true') {
      addToast(result2?.message || 'Phone Number already exists', {
        appearance: 'error',
        autoDismiss: true,
      })
      setMobileValid(result2?.message || 'Phone Number already exists')
      return
    }
    setMobileValid('')

    setStep(+step + 1)
  }

  /* Step 3 */
  const registerBusiness = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    const result = await authService.registerBusiness({
      userID: null,
      email: email,
      contactNo: mobileNumber,
      userName: null,
      facebookUserID: null,
      googleUserID: null,
      linkedInUserID: null,
      forgetPasswordCode: null,
      rId: null,
      staId: null,
      name: null,
      password: password,
      track: null,
      compPackageID: null,
      categoryID: Number(subCategoryId),
      roleId: null,
      roleName: null,
      statusId: null,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      dateofBirth: null,
      gender: null,
      vGender: null,
      streetAddress: null,
      countryId: null,
      countryName: null,
      provinceID: Number(province),
      provinceName: provinceList?.find(
        (e) => e?.provinceId?.toString() === province,
      )?.provinceName,
      cityID: Number(city),
      cityName: cityList?.find((e) => e?.cityId?.toString() === city)?.cityName,
      suburbID: Number(suburb),
      suburbName: suburbList?.find((e) => e?.suburbId?.toString() === city)
        ?.suburbName,
      zipCode: null,
      longitude: null,
      latitude: null,
      statusName: null,
      lastLogin: null,
      companyId: null,
      companyName: companyName,
      compPercent: null,
      packageID: selectedPackageId,
      getRequests: null,
      isLoggedIn: null,
      isMobileLoggedIn: null,
      userProfileImage: null,
      userProfileThumbNailImage: null,
      failedLoginCount: null,
      postOnFB: null,
      fBAccessCode: null,
      postOnGP: null,
      twitterUserId: null,
      postOnTwitter: null,
      instagramUserID: null,
      postOnInstagram: null,
      emailNotification: null,
      sMSNotification: null,
      joinDate: null,
      postOnLI: null,
      franchiseID: null,
      deviceType: null,
      deviceID: null,
      token: null,
      tokenExpired: null,
      mobileActivationCode: null,
      emailActivationCode: null,
      domainUrl: '1', // lawyer : 1, Manufaturing: 2, TyresandShocks: 3, Carspares: 4
      paymentUrl: null,
      discount: discount[months.toString()],
    })
    setLoading(false)
    console.log(result)
    if (result?.token) {
      localStorage.setItem('token', result.token)
      addToast('Successfully registered business!', {
        appearance: 'success',
        autoDismiss: true,
      })
      const session = await authService.getSession(1)
      console.log(session)
      if (session?.sessionKeyLogin) {
        const totalAmount = (
          (selectedPackage?.amount *
            months *
            (115 - discount[months.toString()])) /
          100
        ).toFixed(2)
        // payfast...
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
        payfastUrl += `&return_url=https://business.laywersezyfind.co.za`
        payfastUrl += `&cancel_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/cancel`
        payfastUrl += `&notify_url=${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/notify`
        payfastUrl += `&m_payment_id=13184`
        payfastUrl += `&amount=${totalAmount}`
        payfastUrl += `&item_name=${
          selectedPackage?.packageName || 'Company' + selectedPackage?.packageID
        }`
        payfastUrl += `&item_description=${selectedPackage?.recommendedText}`
        payfastUrl += `&subscription_type=3`

        if (result?.paymentUrl) {
          payfastUrl = result.paymentUrl.replace(
            'https://www.lawyersezyfind.co.za/LCPayFastReturn.html',
            `${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/success`,
          )
          payfastUrl = payfastUrl.replace(
            'https://www.lawyersezyfind.co.za/LCPayFastCancel.html',
            `${process.env.NEXT_PUBLIC_ROOT_URL}/lawyers/payment/cancel`,
          )
        }
        window.location.assign(payfastUrl)
      } else {
        addToast('Failed to get session', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } else {
      addToast('Failed to register business', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const selectedPackage = packages.find(
    (e) => e.packageID === selectedPackageId,
  )

  /* Package Section */
  if (step === 1)
    return (
      <Container className="planing_section">
        <Row>
          <Col xs={12} className="text-center">
            <h1>Select Subscription Plan</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="tabs-wrapper">
              <div className="tabs enabled">
                <ul className="tab-list" role="tablist"></ul>
                <ul className="tab-list" role="tablist">
                  <li
                    className="tab active-tab"
                    id="tablist1-tab1"
                    aria-controls="tablist1-panel1"
                    role="tab"
                    tabIndex={0}
                    onClick={() => setMonths(1)}
                    style={
                      months === 1
                        ? {
                            transform: 'scale(1.1)',
                            zIndex: 9999,
                          }
                        : {}
                    }
                  >
                    <b id="A1" className="clicked">
                      1 Month
                    </b>
                  </li>
                  <li
                    className="tab"
                    id="tablist1-tab2"
                    aria-controls="tablist1-panel2"
                    role="tab"
                    tabIndex={0}
                    onClick={() => setMonths(3)}
                    style={
                      months === 3
                        ? {
                            transform: 'scale(1.1)',
                            zIndex: 9999,
                          }
                        : {}
                    }
                  >
                    <b id="A3">3 Months (5% OFF)</b>
                  </li>
                  <li
                    className="tab"
                    id="tablist1-tab3"
                    aria-controls="tablist1-panel3"
                    role="tab"
                    tabIndex={0}
                    onClick={() => setMonths(6)}
                    style={
                      months === 6
                        ? {
                            transform: 'scale(1.1)',
                            zIndex: 9999,
                          }
                        : {}
                    }
                  >
                    <b id="A6">6 Months (10% OFF)</b>
                  </li>
                  <li
                    className="tab"
                    id="tablist1-tab4"
                    aria-controls="tablist1-panel4"
                    role="tab"
                    tabIndex={0}
                    onClick={() => setMonths(12)}
                    style={
                      months === 12
                        ? {
                            transform: 'scale(1.1)',
                            zIndex: 9999,
                          }
                        : {}
                    }
                  >
                    <b id="A9">12 Months (15% OFF)</b>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="planing_area">
          {packages.map((pkg, index) => (
            <Col xs={12} sm={3} key={index}>
              <div
                className={`planing_details ${
                  selectedPackageId === pkg.packageID &&
                  // selectedMonths === months &&
                  'active_plan'
                }`}
                id={'package' + pkg?.packageID}
                onMouseOver={() => {
                  setSelectedPackageId(pkg.packageID)
                }}
                /* onMouseOut={() => {
                  setSelectedPackageId(null)
                }} */
              >
                <h2>{pkg?.packageName}</h2>
                <div className="plan-price clearfix">
                  {months > 1 && (
                    <div className="dicount-percent">
                      <p>
                        {discount[months.toString()]}% <br /> off
                      </p>
                    </div>
                  )}
                  <h3>
                    {months > 1 && (
                      <small>R{renderPrice(pkg?.amount).originPrice}</small>
                    )}
                    <br />R{renderPrice(pkg?.amount).offPrice}
                    <br />
                    <span className="period">
                      {' '}
                      per {months === 1 ? '' : months} month
                    </span>
                  </h3>
                </div>
                <div className="plan-features">
                  <ul>
                    {pkg.detail?.map((e, index) => (
                      <li
                        style={
                          e.pD_isActive
                            ? {}
                            : {
                                textDecoration: 'line-through',
                                opacity: 0.8,
                              }
                        }
                        key={index}
                      >
                        {renderPackageDetail(e)}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="button light"
                    onClick={() => {
                      setSelectedPackageId(pkg.packageID)
                      setStep(+step + 1)
                    }}
                  >
                    Select
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="my-5 justify-content-center">
          <Col xs={12} sm={8}>
            <p>
              <b>
                Register your legal firm today &amp; get the following.&nbsp;
              </b>
              <br />
              <br />
              1. Company portfolio / description listings for google online
              presence.&nbsp;&nbsp;
              <br />
              2. Online product listings.&nbsp;Capture all your initial
              consultations with prices &amp; obtain online paid clients.&nbsp;
              <br />
              3. 800+ FREE legal contract agreement templates to use for your
              clients.&nbsp;
              <br />
              4. Full integrated bookings &amp; payments&nbsp;Customise invoice
              &amp; quotes with your company logo &amp; colors.&nbsp;&nbsp;
              <br />
              5. CRM solution (Customer Relationship Management)
              <br />
              6. Online query &amp; chat. &nbsp; Zoom &amp; Skype link
              submission for online consultation.&nbsp;&nbsp;
              <br />
              7. Fully managed dashboard.
              <br />
              8. Ratings &amp; Reviews, much much more
            </p>
          </Col>
        </Row>
      </Container>
    )
  else if (step === 2) {
    return (
      <Container className="register-section">
        {/* <Row className="ezy-container mx-auto">
          <Col md={{ span: 10, offset: 1 }} xs={12}>
            <div className="breadcrumbs clearfix">
              <ul className="clearfix mb-0">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Business Registration</li>
              </ul>
            </div>
          </Col>
        </Row> */}
        <Row className="my-5">
          <Col md={8} xs={12}>
            <Form onSubmit={handleSubmitRegister}>
              <div className="payment_wrapper clearfix">
                <div className="pay_tle">Company Information Up</div>
                <div className="Registration_page">
                  <div className="Registration_col">
                    <Form.Group controlId="formBasicCompanyName">
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Company Name"
                        required
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                      />
                      {companyValid && (
                        <Form.Text className="text-danger">
                          {companyValid}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formBasicCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={(e) => setSubCategoryId(e.target.value)}
                        value={subCategoryId}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {subCategoryList?.map((category, index) => (
                          <option value={category?.categoryId} key={index}>
                            {category?.categoryName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email or mobile number"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                      {emailValid && (
                        <Form.Text className="text-danger">
                          {emailValid}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formBasicMobileNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            +27
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="number"
                          placeholder="Enter Mobile Number"
                          aria-describedby="inputGroupPrepend"
                          onChange={(e) =>
                            setMobileNumber(e.target.value.slice(0, 9))
                          }
                          maxLength={9}
                          value={mobileNumber}
                        />
                        {mobileValid && (
                          <Form.Text className="text-danger">
                            {mobileValid}
                          </Form.Text>
                        )}
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicRepeatPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Confirm Password"
                        required
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      {pwdValid && (
                        <Form.Text className="text-danger">
                          {pwdValid}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formBasicProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={handleChangeProvince}
                        placeholder="Select Province"
                        value={province}
                      >
                        <option value="" disabled>
                          Select Province
                        </option>
                        {provinceList?.map((e, index) => (
                          <option value={e?.provinceId || ''} key={index}>
                            {e?.provinceName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={handleChangeCity}
                        placeholder="Select City"
                        value={city}
                      >
                        <option value="" disabled>
                          Select City
                        </option>
                        {cityList?.map((e, index) => (
                          <option value={e?.cityId || ''} key={index}>
                            {e?.cityName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicSuburb">
                      <Form.Label>Suburb</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={(e) => setSuburb(e.target.value)}
                        placeholder="Select Suburb"
                        value={suburb}
                      >
                        <option value="" disabled>
                          Select Suburb
                        </option>
                        {suburbList?.map((e, index) => (
                          <option value={e?.suburbId || ''} key={index}>
                            {e?.suburbName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        required
                        label="I agree that the information provided above is true to my knowledge and accept the terms & conditions."
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="read_more">
                  <button
                    className="btn-ezy btn-ezy-secondary"
                    type="button"
                    onClick={() => setStep(+step - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="btn-ezy btn-ezy-primary ml-1"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </div>
            </Form>
          </Col>
          <Col md={4} xs={12}>
            <div className="order-sec">
              <div className="pay_tle">Package Summary</div>
              <div className="order_details clearfix">
                <p>
                  Package (A) :
                  <i id="lblPackageName">{selectedPackage?.packageName}</i>{' '}
                  <span id="spPackageCost">
                    R {renderPrice(selectedPackage?.amount).originPrice}
                  </span>
                </p>
                <p id="dvDiscount" className="summary-item">
                  Discount (B) :{' '}
                  <span id="spDiscount">
                    R {renderPrice(selectedPackage?.amount).discount}
                  </span>
                </p>
                <p>
                  VAT (15%)(C) :{' '}
                  <span id="spVATAmount">
                    R {renderPrice(selectedPackage?.amount).vat}
                  </span>
                </p>
                <p className="total_amt">
                  Total(A-B+C) :{' '}
                  <span id="spTotalAmount">
                    R {renderPrice(selectedPackage?.amount).total}
                  </span>
                </p>
                <br />
                <div className="clear"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container className="register-section">
        <Row className="my-4">
          <Col md={8} xs={12}>
            <div className="payment_wrapper clearfix">
              <div className="pay_tle">Information Summary</div>
              <div className="payment_details_sec">
                <div className="information_col clearfix">
                  <h3>Company Information</h3>
                  <p>
                    <span>Company Name: </span>
                    <i id="dvCompanyName">{companyName}</i>
                  </p>
                  <div className="clear"></div>
                </div>
                <div className="information_col clearfix">
                  <h3>main business user information</h3>
                  <p>
                    <span>Name: </span>
                    <i id="dvFullName">{`${firstName} ${lastName}`}</i>
                  </p>
                  <p>
                    <span>E-mail: </span>
                    <i id="dvMBUEmail">{email}</i>
                  </p>
                  <p>
                    <span>Mobile No: </span>
                    <i id="dvMobile">+27{mobileNumber}</i>
                  </p>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} xs={12}>
            <div className="order-sec">
              <div className="pay_tle">Package Details</div>
              <div className="order_details clearfix">
                <p>
                  Package Cost(A) :
                  <i id="lblPackageName">{selectedPackage?.packageName}</i>{' '}
                  <span id="spPackageCost">
                    R {renderPrice(selectedPackage?.amount).originPrice}
                  </span>
                </p>
                <p id="dvDiscount" className="summary-item">
                  Discount (B) :{' '}
                  <span id="spDiscount">
                    R {renderPrice(selectedPackage?.amount).discount}
                  </span>
                </p>
                <p>
                  VAT (15%)(C) :{' '}
                  <span id="spVATAmount">
                    R {renderPrice(selectedPackage?.amount).vat}
                  </span>
                </p>
                <p className="total_amt">
                  Total(A-B+C) :{' '}
                  <span id="spTotalAmount">
                    R {renderPrice(selectedPackage?.amount).total}
                  </span>
                </p>
                <br />
                <div className="clear"></div>
              </div>
            </div>
            <div className="payment-method-sec order-sec">
              <div className="pay_tle">Select Payment Method</div>
              <div className="order_details payment-method-details clearfix">
                <div className="payment_method_details_sec">
                  <div className="accordion2">
                    <h3 className="active">
                      <img src="/assets/img/payfast_icon.webp" alt="payfast_icon" />{' '}
                      <img
                        src="/assets/img/checked.webp"
                        className="checkedPay"
                        alt="checked"
                      />
                    </h3>
                    <div className="pm-select">
                      <div className="pay_info clearfix">
                        <h4>
                          After payment via PayFast's Secure checkout, your
                          order will be placed
                        </h4>
                        <h4>PayFast accepts</h4>
                        <div className="pay_card">
                          <a href="#tab1">
                            <img src="/assets/img/payment_icon.webp" alt="payment_icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="read_more" onSubmit={registerBusiness}>
              <button
                className="btn-ezy btn-ezy-secondary"
                type="button"
                onClick={() => setStep(+step - 1)}
              >
                Previous
              </button>
              <button
                type="submit"
                className="btn-ezy btn-ezy-primary ml-1"
                disabled={loading}
              >
                Pay Now
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default PlanSection
