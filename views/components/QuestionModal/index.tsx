import React, { useState } from 'react'
import Link from 'next/link'
import { Dispatch } from 'redux'
import { useAppDispatch } from '@redux/hooks'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import authService from '@services/authService'
import businessService from '@services/businessService'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { setRegisteredUser } from '@views/containers/Reference/ReferenceSlice'
import { doLogin, doRegister } from '@views/lib/auth'
import { config } from '@views/lib/constants'
import { useToasts } from 'react-toast-notifications'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'

const actionDispatch = (dispatch: Dispatch) => ({
  setRegisteredUser: (data: RegisterUser_registerUser_result) =>
    dispatch(setRegisteredUser(data)),
})

const QuestionModal = (props: any) => {
  const { addToast } = useToasts()

  const { setRegisteredUser } = actionDispatch(useAppDispatch())
  const [step, setStep] = useState<Number>(1)
  const [searchParam, setSearchParam] = useState<any>({})
  const [email, setEmail] = useState<string>('')
  const [emailValid, setEmailValid] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [mobileValid, setMobileValid] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [forgotPwd, setForgotPwd] = useState<boolean>(false)
  const [pwdValid, setPwdValid] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  /* Step 1 */
  const handleSubmitDesc = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setStep(+step + 1)
  }

  /* Contact Attorney (API) */
  const contactAttorney = async () => {
    // setLoading(true)
    const result = await businessService
      .addCustomerEnquiry({
        enquiryTitle: searchParam.title,
        enquiryDescription: searchParam.description,
        companyId: props.companyId,
      })
    // setLoading(false)
    console.log(result)
    if (result?.success) {
      addToast('Successfully added enquiry!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setStep(1)
      props.toggle(false)
    } else {
      addToast('Failed to add enquiry', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
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
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${userID}:3`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Facebook!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        contactAttorney()
        return
      } else {
        addToast('Failed to login with Facebook', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }

    setLoading(true)
    const result = await doRegister(
      email,
      userID,
      null,
      picture.data.url,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      accessToken,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered with Facebook!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      contactAttorney()
    } else {
      addToast('Failed to register with Facebook', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
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
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${googleId}:4`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Google!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        contactAttorney()
        return
      } else {
        addToast('Failed to login with Google', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }
    setLoading(true)
    const result = await doRegister(
      email,
      null,
      googleId,
      picture,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
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
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered  with Google!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      contactAttorney()
    } else {
      addToast('Failed to register with Google', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const handleSubmitRequest = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // password vaild
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(password)) {
      setPwdValid('Include one capital letter and one number or more')
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

    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const loginRes = await doLogin(email, password)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        contactAttorney()
        return
      } else {
        addToast('Password is not correct', {
          appearance: 'error',
          autoDismiss: true,
        })
        setForgotPwd(true)
        return
      }
      // setEmailValid(result1.message)
      // return
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

    setLoading(true)
    const result = await doRegister(
      email,
      null,
      null,
      null,
      null,
      null,
      mobileNumber,
      password,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      contactAttorney()
    } else {
      addToast('Failed to register', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.toggle(false)}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title || 'Contact Attorney'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="request-item-form">
        {step === 1 ? (
          <Form
            className="request-item-form-box pb-0"
            onSubmit={handleSubmitDesc}
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                required
                onChange={(e: any) =>
                  setSearchParam({
                    ...searchParam,
                    title: e.target.value,
                  })
                }
                value={searchParam.title || ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                required
                onChange={(e: any) =>
                  setSearchParam({
                    ...searchParam,
                    description: e.target.value,
                  })
                }
                value={searchParam.description || ''}
              />
            </Form.Group>
            <Form.Group className="text-right">
              <button
                type="submit"
                className="btn-ezy btn-ezy-primary btn-ezy-round"
                // disabled={!searchParam.title || !searchParam.description}
              >
                Next
              </button>
            </Form.Group>
          </Form>
        ) : (
          <Form onSubmit={handleSubmitRequest}>
            <Form.Group className="mb-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e: any) => setEmail(e.target.value)}
                value={email || ''}
              />
              {emailValid && (
                <Form.Text className="text-danger">{emailValid}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">+27</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter mobile number"
                  aria-describedby="inputGroupPrepend"
                  name="phone"
                  required
                  maxLength={9}
                  onChange={(e) => setMobileNumber(e.target.value.slice(0, 9))}
                  value={mobileNumber || ''}
                />
              </InputGroup>
              {mobileValid && (
                <Form.Text className="text-danger">{mobileValid}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                onChange={(e: any) => setPassword(e.target.value)}
                value={password || ''}
              />
              {pwdValid && (
                <Form.Text className="text-danger">{pwdValid}</Form.Text>
              )}
              {forgotPwd && (
                <Form.Text className="text-danger text-right cursor-pointer">
                  <Link href="/forgot">Forgot password?</Link>
                </Form.Text>
              )}
            </Form.Group>
            <div className="request-item-form-box mb-0">
              <hr />
              <span className="hr-text text-secondary">Or</span>
            </div>
            <div className="request-item-form-box mb-3 d-flex justify-content-between">
              <FacebookLogin
                appId={config?.facebookAppId || ''}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon my-1 xs-w-100 px-1"
                icon="fa-facebook mr-2"
                textButton="Facebook"
              />
              <GoogleLogin
                clientId={config?.googleClientId || ''}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon ml-2 my-1 xs-w-100 px-1"
                  >
                    <i className="fa fa-google mr-2" aria-hidden="true"></i>
                    Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="request-item-form-box mb-0 d-flex justify-content-between">
              <button
                type="button"
                className="btn-ezy btn-ezy-secondary btn-ezy-round"
                aria-label="Prev"
                onClick={() => setStep(+step - 1)}
              >
                Prev
              </button>
              <button
                type="submit"
                className="btn-ezy btn-ezy-primary btn-ezy-round"
                aria-label="Request"
                disabled={!mobileNumber || !email || loading}
              >
                Request
              </button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default QuestionModal
