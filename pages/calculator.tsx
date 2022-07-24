import React from 'react'
import Head from 'next/head'

import { HeroImage, CalculatorSection } from '@views/components'

interface ICalculatorPageProps {}

const Calculator = (props: ICalculatorPageProps) => {

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
        <title>EzyFind | Child Maintenance Calculator</title>
        <meta
          name="description"
          content="How much child maintenance should I pay, FREE Calculator !!"
        />
        <meta
          name="keywords"
          content="Child maintenance calculator, FREE child maintenance calculator"
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
      <HeroImage title="Child Maintenance Calculator" bgImageUrl="/assets/img/lawyer/children_calc_banner.webp" />
      <CalculatorSection />
    </div>
  )
}

export default Calculator
