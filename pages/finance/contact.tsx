import React from 'react'
import Head from 'next/head'

import { HeroImage, ContactUsSection } from '@views/components'

interface IContactPageProps {}

const ContactUS = (props: IContactPageProps) => {

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
        <title>EzyFind | Contact Us</title>
        <meta
          name="description"
          content="Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys"
        />
        <meta
          name="keywords"
          content="Are you looking for the best business credit cards loan in South Africa? FinanceEzyFind.co.za Submit your request and obtain multiple quotes/rates from all banks & financial providers in South Africa!!"
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
      <HeroImage title="Contact Us" bgImageUrl="/assets/img/finance/contact_us_banner.webp" />
      <ContactUsSection />
    </div>
  )
}

export default ContactUS
