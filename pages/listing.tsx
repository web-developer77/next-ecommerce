import React, { useEffect } from 'react'
import Head from 'next/head'

import { DownloadSection, HeroImage, LegalContractSection } from '@views/components'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
  makeSelectProductList,
} from '@views/containers/HomePage/selectors'
import productsService from '@services/productsService'
import { GetProducts } from '@services/productsService/__generated__/GetProducts'
import {
  ProductsSection,
} from '@views/components'

import {
  setProductList,
} from '@views/containers/HomePage/homePageSlice'
import { Loading } from '@views/elements'

/* StaticProps */
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticProps: GetStaticProps = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const _productList = await productsService
    .getPrdProductList(
      null,
      null,
      null,
      null,
      categoryId == 1447 ? null : categoryId,
      null,
      null,
      null,
      null,
      null,
      10,
      1,
      null,
      response?.data?.guestLogin?.result?.value, // guest token
    )
  return {
    props: {
      _productList,
    },
  }
}

const stateSelector = createSelector(makeSelectProductList, (productList) => ({
  productList,
}));
const actionDispatch = (dispatch: Dispatch) => ({
  setProductList: (page: GetProducts[]) => dispatch(setProductList(page)),
})

const LegalContracts = (props: any) => {
  const { _productList } = props
  const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);
  const { productList } = useAppSelector(stateSelector)
  const [prdLoading, setPrdLoading] = React.useState<boolean>(false)
  const { setProductList } = actionDispatch(useAppDispatch())

  useEffect(() => {
    if (!_productList?.result?.length && !productList?.result?.length) {
      fetchProductList(null, 1)
    } else {
      setProductList(_productList)
    }
  }, [])

  const fetchProductList = async (
    domainCategoryIds: String | null,
    page: Number | null,
  ) => {
    setPrdLoading(true)
    const result = await productsService
      .getPrdProductList(
        null,
        null,
        null,
        null,
        categoryId == 1447 ? null : categoryId,
        domainCategoryIds,
        null,
        null,
        null,
        null,
        10,
        page,
        null
      )
      .catch((err) => {
        console.log('Error', err)
      })

    setPrdLoading(false)
    let res: any = result
    if (res?.success) {
      setProductList(res)
    }
  }
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
      <LegalContractSection />
      <div style={{ height: 50 }} />
      {!prdLoading ? (
        <ProductsSection productList={productList} />
      ) : (
        <Loading />
      )}
      <DownloadSection />
    </div>
  )
}

export default LegalContracts
