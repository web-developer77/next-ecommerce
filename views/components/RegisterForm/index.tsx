import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import style from './registerform.module.scss'
import { getMobileOperatingSystem } from '@views/lib/helper'
import authService from '@services/authService'
import referenceService from '@services/referenceService'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import {
  setCityList,
  setSuburbList,
  setRegisteredUser,
} from '@views/containers/Reference/ReferenceSlice'
import { GetCity_getCity_result } from '@services/referenceService/__generated__/GetCity'
import { GetSuburb_getSuburb_result } from '@services/referenceService/__generated__/GetSuburb'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'
import { useCookies } from 'react-cookie'
import { config } from '@views/lib/constants'
import { useToasts } from 'react-toast-notifications'
import { categoryData } from '@views/lib/constants'

const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.NEXT_PUBLIC_SECRET_KEY)

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const actionDispatch = (dispatch: Dispatch) => ({
  setCityList: (data: GetCity_getCity_result[]) => dispatch(setCityList(data)),
  setSuburbList: (data: GetSuburb_getSuburb_result[]) =>
    dispatch(setSuburbList(data)),
  setRegisteredUser: (data: RegisterUser_registerUser_result) =>
    dispatch(setRegisteredUser(data)),
})

const RegisterForm = (props: any) => {
  const router = useRouter()
  const { addToast } = useToasts()
  const { setCityList, setSuburbList, setRegisteredUser } = actionDispatch(
    useAppDispatch(),
  )
  const { provinceList, cityList, suburbList, registeredUser } = useAppSelector(
    referenceSelector,
  )

  useEffect(() => {
    if (registeredUser?.token) router.push(`/${categoryData.name}`)
  }, [])

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
  const [cookies, setCookie] = useCookies(['EzyFind_UID', 'EzyFind_Contract'])

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

  const registerUser = async (
    email: string,
    facebookUserID: string | null,
    googleUserID: string | null,
    userProfileImage: string | null,
    firstName: string | null,
    lastName: string | null,
    fBAccessCode: string | null,
  ) => {
    setLoading(true)
    const username = facebookUserID || googleUserID || email
    const pwd = facebookUserID ? 3 : googleUserID ? 4 : password
    const token = 'Basic ' + window.btoa(`${username}:${pwd}`)
    const result = await authService.registerUser(
      {
        userID: null,
        email: email,
        contactNo: facebookUserID || googleUserID ? null : mobileNumber,
        userName: null,
        facebookUserID: facebookUserID,
        googleUserID: googleUserID,
        linkedInUserID: null,
        forgetPasswordCode: null,
        rId: null,
        staId: null,
        name: null,
        password: facebookUserID || googleUserID ? null : password,
        track: facebookUserID ? 3 : googleUserID ? 4 : 1,
        compPackageID: null,
        categoryID: null,
        roleId: null,
        roleName: null,
        statusId: null,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName || ''} ${lastName || ''}`,
        dateofBirth: null,
        gender: null,
        vGender: null,
        streetAddress: null,
        countryId: null,
        countryName: null,
        provinceID: province ? Number(province) : null,
        provinceName:
          (province &&
            provinceList?.find((e) => e.provinceId === province)
              ?.provinceName) ||
          null,
        cityID: city ? Number(city) : null,
        cityName:
          (city &&
            cityList?.find((e) => e.cityId === Number(city))?.cityName) ||
          null,
        suburbID: suburb ? Number(suburb) : null,
        suburbName:
          (suburb &&
            suburbList?.find((e) => e.suburbId === Number(suburb))
              ?.suburbName) ||
          null,
        zipCode: null,
        longitude: null,
        latitude: null,
        statusName: null,
        lastLogin: null,
        companyId: null,
        companyName: null,
        compPercent: null,
        packageID: null,
        getRequests: null,
        isLoggedIn: null,
        isMobileLoggedIn: null,
        userProfileImage: userProfileImage,
        userProfileThumbNailImage: userProfileImage,
        failedLoginCount: null,
        postOnFB: null,
        fBAccessCode: fBAccessCode || null,
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
      },
      getMobileOperatingSystem() === 'unknown' ? 1 : 0,
      token,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      localStorage.setItem('token', result.token)
      addToast('Successfully registered!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      const session = await authService.getSession(1)
      console.log(session)
      if (session?.sessionKeyLogin) {
        setCookie(
          'EzyFind_UID',
          cryptr.encrypt(session.sessionKeyLogin),
          {
            path: '/',
            expires: new Date(Date.now() + 120 * 60 * 1000),
            domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
          },
        )
        setCookie('EzyFind_Contract', cryptr.encrypt('Contract'), {
          path: '/',
          expires: new Date(Date.now() + 120 * 60 * 1000),
          domain: process.env.NEXT_PUBLIC_ROOT_URL?.replace('https://', '.'),
        })
        window.location.assign('https://individual.lawyersezyfind.co.za')
      } else {
        addToast('Could not get session', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } else {
      addToast('Failed to register', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const handleSubmitRegister = async (e: any) => {
    e.preventDefault()

    // passwordCheck
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(password)) {
      setPwdValid('Include one capital letter and one number or more')
      return
    }
    if (repeatPassword && password && password !== repeatPassword) {
      setPwdValid('Not matched Password')
      return
    }
    setPwdValid('')

    // mobileCheck
    if (
      !mobileNumber.match(/^(\+\d{1,3}[- ]?)?\d{9}$/) ||
      mobileNumber.match(/0{5,}/)
    ) {
      setMobileValid('Invaild Mobile Number')
      return
    }
    setMobileValid('')

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
      setMobileValid(result2?.message || 'Mobile Number already exists')
      return
    }
    setMobileValid('')

    // register
    registerUser(email, null, null, null, firstName, lastName, null)
  }
  const responseFacebook = async (response: any) => {
    console.log(response)
    const { email, name, userID, picture, accessToken } = response
    if (!userID || !accessToken) {
      addToast('FaceBook OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    // register
    registerUser(
      email,
      userID,
      null,
      picture.data.url,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      accessToken,
    )
  }
  const responseGoogle = async (response: any) => {
    console.log(response)
    if (response?.error) {
      addToast('Google OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    const {
      googleId,
      accessToken,
      tokenId,
      profileObj: { email, name, imageUrl: picture },
    } = response

    // emailCheck
    const result = await authService.emailCheck(email)
    console.log(result)
    if (result?.message === 'Email already exists') {
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }

    // register
    registerUser(
      email,
      null,
      googleId,
      picture,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
    )
  }

  return (
    <Container className={style.loginform}>
      <Row className={style.formheader}>
        <Col md={6} xs={12}>
          <h5>Sing Up</h5>
        </Col>
        <Col
          md={6}
          xs={12}
          className="d-flex justify-content-end align-items-center"
        >
          <span>Already have an account?</span>
          <Link href="/login">
            <button className="btn-ezy btn-ezy-primary btn-ezy-round ml-2">
              Sign In
            </button>
          </Link>
        </Col>
        <br />
        <br />
        <Col md={6} xs={12}>
          <h5>Social Login</h5>
          <p>Sign in with one-click with your social accounts.</p>
        </Col>
        <Col
          md={6}
          xs={12}
          className="d-flex justify-content-end align-items-center"
        >
          <FacebookLogin
            appId={config?.facebookAppId || ''}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn-ezy btn-ezy-primary btn-ezy-circle my-1"
            icon="fa-facebook mr-2"
            textButton=""
          />
          <GoogleLogin
            clientId={config?.googleClientId || ''}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="btn-ezy btn-ezy-primary btn-ezy-circle ml-2 my-1"
              >
                <i className="fa fa-google" aria-hidden="true"></i>
              </button>
            )}
            buttonText=""
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
      <Row className={style.formcontent}>
        <Col xs={12}>
          <p>We are happy to see you return</p>
        </Col>
        <Col xs={12} className="py-3">
          <Form onSubmit={handleSubmitRegister}>
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
                <Form.Text className="text-danger">{emailValid}</Form.Text>
              )}
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
                <Form.Text className="text-danger">{pwdValid}</Form.Text>
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
            <Form.Group controlId="formBasicMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">+27</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setMobileNumber(e.target.value.slice(0, 9))}
                  maxLength={9}
                  value={mobileNumber}
                />
              </InputGroup>
              {mobileValid && (
                <Form.Text className="text-danger">{mobileValid}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree that the information provided above is true to my knowledge and accept the terms & conditions."
                required
              />
            </Form.Group>
            <Row className="d-flex justify-content-between">
              <button
                className="btn-ezy btn-ezy-primary btn-ezy-round btn-ezy-wider"
                type="submit"
                disabled={loading}
              >
                Sign Up
              </button>
            </Row>
          </Form>
        </Col>
        <Col xs={12} className="py-2">
          <h3>Social Login</h3>
          <p>Sign in with one-click with your social accounts.</p>
        </Col>
        <Col xs={12}>
          <FacebookLogin
            appId={config?.facebookAppId || ''}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon my-1 xs-w-100"
            icon="fa-facebook mr-2"
            textButton="Sign in with Facebook"
          />
          <GoogleLogin
            clientId={config?.googleClientId || ''}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon ml-2 my-1 xs-w-100"
              >
                <i className="fa fa-google mr-2" aria-hidden="true"></i>
                Sign in with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterForm
