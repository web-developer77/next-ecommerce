import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import { HeroImage } from '@views/components'

const PaymentSuccess = (props: any) => {
  const [cookies, setCookie, removeCookie] = useCookies(['directive', 'test-wnw'])
  const router = useRouter()

  useEffect(() => {
    let token = localStorage.getItem('token')
    let url: any = process.env.NEXT_PUBLIC_DASHBOARD_URL
    if (token) {
      setCookie('directive', token)
      window.location.assign(url);
    }
  }, [])

  return (
    <div className="fluid-container">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="" />
        <title>EzyFind | Payment Success</title>
        <meta
          name="description"
          content="Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys"
        />
        <meta
          name="keywords"
          content="Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa"
        />
        <meta name="apple-itunes-app" content="app-id=980233151" />
        <meta name="google-play-app" content="app-id=com.INNOVEzyFind" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/assets/img/favicon.png"
        />
      </Head>
      <HeroImage title="Success" bgImageUrl="/assets/img/emtycart_banner.webp" />
      <Container>
        <Row className="my-5">
          <Col sm={12} className="text-center">
            <h2>Your payment is success</h2>
            <p>
              You can browse through the legal products{' '}
              <span className="text-primary">
                <Link href="/listing">here</Link>
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PaymentSuccess
