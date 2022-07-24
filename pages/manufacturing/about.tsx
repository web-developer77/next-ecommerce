import React from 'react'
import Head from 'next/head'

import { HeroImage, AboutUsSection } from '@views/components'

interface IAboutPageProps {}

const AboutUS = (props: IAboutPageProps) => {

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
        <title>EzyFind | About Us</title>
        <meta
          name="description"
          content="South African manufacturers directory - Find Manufacturing and ICT and Electronics in South Africa with all contact information & details for each manufacturing company."
        />
        <meta
          name="keywords"
          content="Find Manufacturing products and services in South Africa."
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
      <HeroImage title="About Us" bgImageUrl="/assets/img/manu/manufacturing-about.webp" />
      <AboutUsSection />
    </div>
  )
}

export default AboutUS
