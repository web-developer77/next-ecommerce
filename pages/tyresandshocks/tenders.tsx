import React from 'react'
import Head from 'next/head'

import { HeroImage, LegalJobSection } from '@views/components'

/* StaticProps */
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'
import referenceService from '@services/referenceService'
import TendersSection from '@views/components/TendersSection'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticProps: GetStaticProps = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const _jobList = await referenceService.getJobList(
    null,
    null,
    categoryId,
    6,
    null,
    null,
    1,
    10,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  return {
    props: {
      _jobList,
    },
  }
}

interface IJobPageProps {
  _jobList: any
}

const Tenders = (props: IJobPageProps) => {

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
        <title>EzyFind | Tenders</title>
        <meta
          name="description"
          content="Aplly for Tenders in South Africa"
        />
        <meta
          name="keywords"
          content=" Tenders in South Africa"
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
      <HeroImage title="Tenders" bgImageUrl="/assets/img/lawyer/business_registration.webp" />
      <TendersSection {...props} />
    </div>
  )
}

export default Tenders
