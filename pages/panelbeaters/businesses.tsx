import React from 'react'
import Head from 'next/head'
import { HeroImage, AttorneyLists, DownloadSection } from '@views/components'

/* StaticProps */
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'
import businessService from '@services/businessService'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticProps: GetStaticProps = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const _businessList = await businessService.getBusinessList(
      null,
      null,
      null,
      null,
      `${categoryId}`,
      null,
      null,
      null,
      null,
      null,
      response?.data?.guestLogin?.result?.value, // guest token
    )
  return {
    props: {
      _businessList,
    },
  }
}

const Attorneys = (props: any) => {
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
        <title>
          Search criteria “Law firms in Province, city, suburb, category” |
          www.LawyersEzyFind.co.za
        </title>
        <meta
          name="description"
          content="Find South Africa Panelbeaters - Snap a picture of your Dent and obtain multiple quotes. Panel Beaters Directory - Click here to view a full list of quality panel beaters in Gauteng, Cape Town, Pretoria, KwaZulu Natal."
        />
        <meta
          name="keywords"
          content="Find South Africa Panelbeaters, Auto Body Repairs in Gauteng, Cape Town, Port Elizabeth, Durban, South Africa"
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
      {categoryId == 1447 && (
        <HeroImage
          title="Attorneys / Lawyers"
          bgImageUrl="/assets/img/business_list.webp"
        />
      )}
      <AttorneyLists {...props} />
      <DownloadSection />
    </div>
  )
}

export default Attorneys
