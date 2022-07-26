import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import productsService from '@services/productsService'
import { GetProducts } from '@services/productsService/__generated__/GetProducts'
import {
  setProductList,
  setLegalList,
} from '@views/containers/HomePage/homePageSlice'
import {
  makeSelectProductList,
  makeSelectLegalList,
} from '@views/containers/HomePage/selectors'

import {
  BannerSection,
  ProductsSection,
  CtaSection,
  DownloadSection,
  CategoryProducts,
} from '@views/components'

import { Loading } from '@views/elements'
import { getRouterParamValue } from '@views/lib/helper'

/* StaticProps */
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'

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
      1447,
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
  const _legalList = await productsService
    .getPrdProductList(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      3,
      null,
      10,
      1,
      null,
      response?.data?.guestLogin?.result?.value, // guest token
    )
  return {
    props: {
      _productList,
      _legalList,
    },
  }
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProductList: (page: GetProducts[]) => dispatch(setProductList(page)),
  setLegalList: (page: GetProducts[]) => dispatch(setLegalList(page)),
})

const stateSelector = createSelector(makeSelectProductList, (productList) => ({
  productList,
}))

const stateLegalSelector = createSelector(makeSelectLegalList, (legalList) => ({
  legalList,
}))

const Home = (props: any) => {
  const { _productList, _legalList } = props
  const router = useRouter()
  const { setProductList, setLegalList } = actionDispatch(useAppDispatch())
  const { productList } = useAppSelector(stateSelector)
  const { legalList } = useAppSelector(stateLegalSelector)
  const [legalLoading, setLegalLoading] = useState<boolean>(false)
  const [prdLoading, setPrdLoading] = useState<boolean>(false)

  const scopeId = getRouterParamValue(router.query?.scopeId, "number", 3)
  const domainCategoryIds = getRouterParamValue(router.query?.domainCategoryIds)

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
        null,
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

  const fetchLegalList = async (
    scopeId: Number | null,
    domainCategoryIds: String | null,
    page: Number | null,
  ) => {
    setLegalLoading(true)
    const result = await productsService
      .getPrdProductList(
        null,
        null,
        null,
        null,
        null,
        domainCategoryIds,
        null,
        null,
        scopeId,
        null,
        10,
        page,
        null
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setLegalLoading(false)
    let res: any = result
    if (res?.success) {
      setLegalList(res)
    }
  }

  useEffect(() => {
    if (!_legalList?.result?.length) {
      fetchLegalList(3, null, 1)
    } else {
      setLegalList(_legalList)
    }
    if (!_productList?.result?.length) {
      fetchProductList(null, 1)
    } else {
      setProductList(_productList)
    }
  }, [])

  useEffect(() => {
    fetchLegalList(scopeId, domainCategoryIds, 1)
    fetchProductList(domainCategoryIds, 1)
  }, [domainCategoryIds, scopeId])

  const legalServiceList = legalList?.result
    ? {
      categoryName: 'Legal Services',
      products:
        legalList.result.length < 2
          ? [
            ...legalList.result,
            ...legalList.result,
            ...legalList.result,
            ...legalList.result,
          ]
          : legalList.result.length < 5
            ? [...legalList.result, ...legalList.result]
            : legalList.result,
    }
    : null

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
        <title>Lawyers EzyFind</title>
        <meta
          name="description"
          content="South African manufacturers directory - Find Manufacturing and ICT and Electronics in South Africa with all contact information & details for each manufacturing company."
        />
        <meta
          name="keywords"
          content="Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa, Contract Lawyer, Attorneys In Durban, Find A Law Attorney Firm, Lawyer Durban, Agreements Lawyer, Find A Law Firm, Legal Lawyers, Free Lawyers, Attorneys In Johannesburg, Free Attorney, Tax Attorney, Legal South Africa"
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
      <BannerSection {...props} />
      {!legalLoading ? (
        legalServiceList?.products.length ? (
          <section className="product-category clearfix">
            <Container fluid className="product-container">
              <CategoryProducts item={legalServiceList} num={0} />
            </Container>
          </section>
        ) : (
          <section className="product-category clearfix">
            <h5 className="text-center">No Legal Service</h5>
          </section>
        )
      ) : (
        <Loading />
      )}
      {!prdLoading ? (
        productList?.result?.length ? (
          <ProductsSection productList={productList} />
        ) : (
          <h5 className="text-center">No Services</h5>
        )
      ) : (
        <Loading />
      )}
      <CtaSection />
      <DownloadSection />
    </div>
  )
}

export default Home
