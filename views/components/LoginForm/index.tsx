import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { Container, Row, Col, Form } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import style from './loginform.module.scss'
import { validateEmail } from '@views/lib/validation'
import authService from '@services/authService'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { useToasts } from 'react-toast-notifications'
import { config } from '@views/lib/constants'
import { setRegisteredUser } from '@views/containers/Reference/ReferenceSlice'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'
import { categoryData } from '@views/lib/constants'

const actionDispatch = (dispatch: Dispatch) => ({
  setRegisteredUser: (data: RegisterUser_registerUser_result) =>
    dispatch(setRegisteredUser(data)),
})

const referenceSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const LoginForm = (props: any) => {
  const router = useRouter()
  const { addToast } = useToasts()

  const { setRegisteredUser } = actionDispatch(useAppDispatch())
  const { registeredUser } = useAppSelector(referenceSelector)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [emailValid, setEmailValid] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (registeredUser?.token) router.push(`/${categoryData.name}`)
  }, [registeredUser])

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
  }
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
    setEmailValid(validateEmail(e.target.value))
  }

  const responseFacebook = async (response: any) => {
    console.log(response)
    const { userID, accessToken } = response
    setLoading(true)
    const token = 'Basic ' + window.btoa(`${userID}:3`)
    const result = await authService.oAuth(token)
    console.log(result)
    setLoading(false)
    if (result?.success && result?.result?.token) {
      localStorage.setItem('token', result.result.token)
      addToast(result?.message || 'Successfully logged in with Facebook!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result.result)
    } else {
      addToast(result?.message || 'Failed to login with Facebook', {
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
    const { googleId } = response
    setLoading(true)
    const token = 'Basic ' + window.btoa(`${googleId}:4`)
    const result = await authService.oAuth(token)
    console.log(result)
    setLoading(false)
    if (result?.success && result?.result?.token) {
      localStorage.setItem('token', result.result.token)
      addToast(result?.message || 'Successfully logged in with Google!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result.result)
    } else {
      addToast(result?.message || 'Failed to login with Google', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const handleSubmitLogin = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // passwordCheck
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(password)) {
      setPwdValid('Include one capital letter and one number or more')
      return
    }
    setPwdValid('')

    // Login...
    setLoading(true)
    const token = 'Basic ' + window.btoa(`${email}:${password}`)
    const result = await authService.sSOLogin(token)
    setLoading(false)
    console.log(result)
    if (result?.success && result?.result?.token) {
      localStorage.setItem('token', result.result.token)
      addToast(result?.message || 'Successfully logged in!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result.result)
    } else {
      addToast(result?.message || 'Failed to login', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <Container className={style.loginform}>
      <Row className={style.formheader}>
        <Col md={6} xs={12}>
          <h5>Login</h5>
        </Col>
        <Col
          md={6}
          xs={12}
          className="d-flex justify-content-end align-items-center"
        >
          <span>Don't have an account?</span>
          <Link href="/register">
            <button className="btn-ezy btn-ezy-primary btn-ezy-round ml-2">
              Sign up
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
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                isInvalid={!emailValid}
                onChange={handleChangeEmail}
              />
              {!emailValid && (
                <Form.Text className="text-danger">Invaild Email</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                onChange={handleChangePassword}
              />
              {pwdValid && (
                <Form.Text className="text-danger">{pwdValid}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember" />
            </Form.Group>
            <Row className="d-flex justify-content-between align-items-center">
              <button
                className="btn-ezy btn-ezy-primary btn-ezy-round btn-ezy-wider"
                type="submit"
                disabled={loading}
              >
                Login
              </button>
              <Link href="/forgot">
                <span className="text-danger cursor-pointer">
                  Forgot Password?
                </span>
              </Link>
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
            buttonText=""
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            // cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
