import React, { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Form } from 'react-bootstrap'
import style from './forgotform.module.scss'
import { validateEmail } from '@views/lib/validation'
import authService from '@services/authService'

const ForgotForm = (props: any) => {
  const [email, setEmail] = useState<String>('')
  const [emailValid, setEmailValid] = useState<Boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
    setEmailValid(validateEmail(e.target.value))
  }
  const handleSubmitForgot = async (e: any) => {
    e.preventDefault()
    // Login...
    setLoading(true)
    const result = await authService.forgetPassword(
      email, 1
    )
    setLoading(false)
    if (result) {
    }
  }

  return (
    <Container className={style.loginform}>
      <Row className={style.formheader}>
        <Col xs={12}>
          <h5>Forgot Password</h5>
        </Col>
      </Row>
      <Row className={style.formcontent}>
        <Col xs={12} md={12} className="px-4 py-2">
          <Form onSubmit={handleSubmitForgot}>
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
            <Row className="d-flex justify-content-between align-items-center">
              <button
                className="btn-ezy btn-ezy-primary btn-ezy-round btn-ezy-wider"
                type="submit"
                disabled={loading}
              >
                Recover Password
              </button>
              <Link href="/login">
                <span className="text-danger cursor-pointer">
                  Back to Login
                </span>
              </Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ForgotForm
