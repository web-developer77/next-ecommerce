import React from 'react'
import Head from 'next/head'

import { HeroImage, ContactUsSection } from '@views/components'

const Home = (props: any) => {

  return (
    <div className="fluid-container">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta
          name="description"
          content="South African manufacturers directory - Find Manufacturing and ICT and Electronics in South Africa with all contact information & details for each manufacturing company."
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="" />
        <title>Car Spares EzyFind | Home</title>
        <meta
          name="description"
          content="Snap and request car part for quotes in Johannesburg - Get Car Parts, Trucks, and auto parts accessories in South Africa. 24/7 Support online chat and Phone: 011 056 9123"
        />
        <meta
          name="keywords"
          content="Car Parts in Gauteng, Cape Town, Port Elizabeth, Durban, South Africa"
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
      <HeroImage title="Home" bgImageUrl="/assets/img/spare/magazin_banner.webp" />
      <h1>Upcoming</h1>
    </div>
  )
}

export default Home
