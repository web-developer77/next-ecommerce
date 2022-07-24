import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'

import { HeroImage } from '@views/components'

const PaymentCancel = (props: any) => {

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
        <title>EzyFind | Payment Canceled</title>
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
      <HeroImage title="Canceled" bgImageUrl="/assets/img/emtycart_banner.webp" />
      <Container>
        <Row className="my-5">
          <Col sm={12} className="text-center">
            <h2>Your payment is canceled</h2>
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

export default PaymentCancel
