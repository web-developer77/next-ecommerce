import React from 'react'
import Head from 'next/head'

import { HeroImage, PlanSection } from '@views/components'

/* StaticProps */
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'
import authService from '@services/authService'

export const getStaticProps: GetStaticProps = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const _packageList = await authService.getMstPackageList(
    null,
    null,
    null,
    null,
    null,
    true,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  return {
    props: {
      _packageList,
    },
  }
}

const Plans = (props: any) => {

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
        <title>EzyFind | Law Firms</title>
        <meta
          name="description"
          content="Business that provides Snap a pic of your mags and get quotes on repairs. South Africa Mag Repairs, Rim Repairs, New Mags, New Rims, BBS Rims, Eagle Rims in Johannesburg, Cape Town, Durban, Sandton, Pretoria, East London, Port Elizabeth"
        />
        <meta
          name="keywords"
          content="wheels, tyres, mags, wheel; tyre, alloy wheels, mag wheels,Mags, Mag Repairs, Rims, Rim Repairs, New Mags, New Rims, BBS Rims, Eagle Rims, South African Car Parts, Johannesburg, Gauteng, Durban, KwaZulu Natal, Cape, Cape Town, Sandton, Pretoria, East London, Port Elizabeth"
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
      <HeroImage title="Law Firms" bgImageUrl="/assets/img/mag/register_banner.webp" />
      <PlanSection {...props} />
    </div>
  )
}

export default Plans
