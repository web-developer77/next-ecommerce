import React from 'react'
import Head from 'next/head'
import { DownloadSection, LegalContractSection } from '@views/components'
import { createSelector } from 'reselect'
import { useAppSelector } from '@redux/hooks'
import { makeSelectProductList } from '@views/containers/HomePage/selectors'
import { ProductsSection } from '@views/components'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

const stateSelector = createSelector(makeSelectProductList, (productList) => ({
  productList,
}))

interface IContractPageProps {}

const LegalContracts = (props: IContractPageProps) => {
  const { productList } = useAppSelector(stateSelector)

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
      {/* <HeroImage title="Legal Agreement" bgImageUrl="/assets/img/business_list.jpg" /> */}
      <LegalContractSection />
      <div style={{ height: 50 }}></div>
      <ProductsSection productList={productList} />
      <DownloadSection />
    </div>
  )
}

export default LegalContracts
