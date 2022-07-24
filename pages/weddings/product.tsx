import React from 'react'
import Head from 'next/head'

import { DownloadSection, HeroImage, LegalContractSection } from '@views/components'

interface IContractPageProps {}

const LegalContracts = (props: IContractPageProps) => {

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
        <title>EzyFind | Legal Agreement</title>
        <meta
          name="description"
          content="Vondeling wines wedding venue - Looking for affordable Vondeling , Sixpence and Memoire Wedding venue in South Africa? Call us right now and get the best all the Wedding Venues, Wedding Planners, Photographers, Honeymoon Destinations and Wedding Service."
        />
        <meta
          name="keywords"
          content="sixpence wedding venue dullstroom, Swanphoto Wedding Photographers, Memoire Wedding & Function Venue, vondeling wines wedding venue, fernwood estate newlands wedding venue"
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
      {/* <HeroImage title="Legal Agreement" bgImageUrl="/assets/img/business_list.jpg" /> */}
      <LegalContractSection />
      <DownloadSection />
    </div>
  )
}

export default LegalContracts
