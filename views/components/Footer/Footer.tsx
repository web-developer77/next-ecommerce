import React from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import { config } from '@views/lib/constants'

const FooterSection = (props: any) => {
  return (
    <section className="page-footer clearfix">
      <Container>
        <Row>
        <Col xs={12} md={6}>
            <div>
              <h3>Quick Links</h3>
              <ul>
                {props.footerList?.map((menu: any, index: number) => (
                  <li key={index} style={{marginTop:5,display:'flex'}}>
                    {/* <p style={{marginRight:5}}>'>'</p>   */}
                    <Link href={`/${props.name}${menu.path}`}>{menu.name}</Link>
                  </li>
                ))}
                {/* <li>
                  <Link href="/attornays">24/7 Support</Link>
                </li>
                <li>
                  <Link href="/">Features</Link>
                </li>
                <li>
                  <Link href="/">About Us</Link>
                </li>
                <li>
                  <Link href="/">Individual Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/">Business Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li> */}
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="footer-col-wrapper clearfix">
              <Row>
              <Col xs={12} md={6}>
                  <div className="footer-box git-category">
                    <h3>Get In Touch</h3>
                    <ul>
                      <li className="noline-support">
                        <Link href="/contact">24/7 Support online chat</Link>
                      </li>
                      <li className="call">
                        <a href="tel:011 056 9123">011 056 9123</a>
                      </li>
                      <li className="mail">
                        <a href="mailto:info@ezyfind.co.za">
                          info@ezyfind.co.za
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                {/* <Col xs={12} md={4}>
                  <div className="footer-box git-category">
                    <h3>Download Apps</h3>
                    <ul>
                      
                      <li style={{paddingLeft:0,marginBottom:5}}>
                        <a href=""><img style={{width:150,height:50}} src="/assets/img/playstore.png" alt="Italian Trulli" /></a>
                      </li>
                      <li style={{paddingLeft:0}}>
                        <a href=""><img style={{width:150,height:50}} src="/assets/img/apple.jpeg" alt="Italian Trulli" /></a>
                      </li>
                    </ul>
                  </div>
                </Col> */}
                 <Col xs={12} md={6}>
                  <div className="footer-box follow-us">
                    <h3>Follow Us On</h3>
                    <ul>
                      <li>
                        <a
                          href={config?.facebookLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook"></i> Facebook
                        </a>
                      </li>
                      <li>
                        <a
                          href={config?.googleLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-google-plus"></i> Google+
                        </a>
                      </li>
                      <li>
                        <a
                          href={config?.twitterLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter"></i> Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default FooterSection
