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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="" />
        <title>Tyres EzyFind | Home</title>
        <meta
          name="description"
          content="Cheap Tyres in South Africa - Snap tyre size and obtain multiple quotes on tyre specials from all tyres providers Request via the website or mobile application online."
        />
        <meta
          name="keywords"
          content="Cheap Tyres In  in Gauteng, Cape Town, Port Elizabeth, Durban, South Africa"
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
      <HeroImage title="Home" bgImageUrl="/assets/img/tyre/magazin_banner.webp" />
      <h1>Upcoming</h1>
    </div>
  )
}

export default Home