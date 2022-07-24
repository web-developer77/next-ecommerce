import React, { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'
import authService from '@services/authService'
import HowToWork from './howtowork'
import { useToasts } from 'react-toast-notifications'

const ContactUsSection = () => {
  const { addToast } = useToasts()
  const [searchParam, setSearchParam] = useState<any>({})
  const handleContact = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const result = await authService.contactUs({
      ...searchParam,
      phone: `+27${searchParam.phone || ''}`,
      id: 1,
    })
    addToast(result?.message || '', {
      appearance: result?.success? 'success' : 'error',
      autoDismiss: true,
    })
    if (result?.success) {
      setSearchParam({})
    }
  }
  return (
    <Container className="contact-us pt-5">
      <HowToWork />
      <Row className="heading pt-5">
        <h2>CONTACT US</h2>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <div className="contact_info">
            <div className="contact_info_col">
              <p>Office Address</p>
              <h3>
                <i className="fa fa-map-marker" aria-hidden="true"></i>{' '}
                Winchester Hills Ext 2 Johannesburg{' '}
              </h3>
            </div>
            <div className="contact_info_col">
              <p>Email ID</p>
              <a href="mailto:info@ezyfind.co.za">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>{' '}
                info@ezyfind.co.za
              </a>
            </div>
            <div className="contact_info_col">
              <p>Phone Number</p>
              <a href="tel:+27 056 9123">
                <i className="fa fa-phone" aria-hidden="true"></i> +27 056 9123
              </a>
            </div>
            <div className="contact_info_col">
              <p>Online Support</p>
              <a href="#">
                <i className="fa fa-info" aria-hidden="true"></i> 24/7 Support
                online chat.{' '}
              </a>
            </div>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <div className="contact_form">
            <h2>
              <span>Stay In</span> Touch
            </h2>
            <Form onSubmit={handleContact}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  required
                  onChange={(e) =>
                    setSearchParam({ ...searchParam, name: e.target.value })
                  }
                  value={searchParam.name || ''}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone:</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">+27</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="phone"
                        placeholder="Enter Phone Number"
                        required
                        onChange={(e) =>
                          setSearchParam({
                            ...searchParam,
                            phone: e.target.value.slice(0, 9),
                          })
                        }
                        value={searchParam.phone || ''}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      required
                      onChange={(e) =>
                        setSearchParam({
                          ...searchParam,
                          email: e.target.value,
                        })
                      }
                      value={searchParam.email || ''}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Subject:</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  required
                  onChange={(e) =>
                    setSearchParam({ ...searchParam, subject: e.target.value })
                  }
                  value={searchParam.subject || ''}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="meggage"
                  rows={3}
                  placeholder="Enter Message"
                  required
                  onChange={(e) =>
                    setSearchParam({ ...searchParam, message: e.target.value })
                  }
                  value={searchParam.message || ''}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  id="cmdSave"
                  className="btn-ezy btn-ezy-primary btn-ezy-round"
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ContactUsSection
