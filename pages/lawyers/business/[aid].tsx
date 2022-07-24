import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HeroImage, Detail, DownloadSection } from '@views/components'
import { Empty, Loading } from '@views/elements'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import businessService from '@services/businessService'
import { GetBusiness_getBusinessList } from '@services/businessService/__generated__/GetBusiness'
import { setBusinessList } from '@views/containers/Attorneys/AttorneyPageSlice'
import { makeSelectBusinessList } from '@views/containers/Attorneys/selectors'
import { getRouterParamValue } from '@views/lib/helper'

/* StaticProps & StaticPaths*/
import { GetStaticPaths, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const result = await businessService.getBusinessList(
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
  const _businessList = await businessService.getBusinessList(
    null,
    null,
    null,
    null,
    `${categoryId}`,
    null,
    null,
    null,
    result?.count,
    1,
    response?.data?.guestLogin?.result?.value, // guest token
  )

  const paths = [
    ...(_businessList?.result?.map((e) => ({
      params: { aid: `${e?.companyId || ''}` },
    })) || ['']),
  ].filter((e: any) => e?.params?.aid)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const _businessList = await businessService.getBusinessList(
    Number(params?.aid),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    response?.data?.guestLogin?.result?.value, // guest token
  )

  const attorney = _businessList?.result?.find(
    (prod) => prod?.companyId === Number(params?.aid),
  )
  const title = `EzyFind | Attorney - ${attorney?.companyName}`
  const metaTags = {
    'og:title': title,
    'og:description':
      'Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys',
    'og:keywords':
      'Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa',
  }
  return { props: { _businessList, metaTags, title } }
}

const actionDispatch = (dispatch: Dispatch) => ({
  setBusinessList: (page: GetBusiness_getBusinessList) =>
    dispatch(setBusinessList(page)),
})

const stateSelector = createSelector(
  makeSelectBusinessList,
  (businessList) => ({
    businessList,
  }),
)

const Attorney = (props: any) => {
  const { _businessList } = props
  const { setBusinessList } = actionDispatch(useAppDispatch())
  const { businessList } = useAppSelector(stateSelector)
  const router = useRouter()
  const { aid } = router.query

  const [loading, setLoading] = useState(false)

  const fetchBusinessById = async () => {
    setLoading(true)
    try {
      const result = await businessService.getBusinessList(
        Number(aid),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      )
      if (result) {
        let response: any = result
        if (response?.success === false) {
        } else {
          setBusinessList(result)
        }
      }
    } catch (err) {
      console.log('Net Error', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (_businessList) {
      setBusinessList(_businessList)
    } else if (aid) {
      fetchBusinessById()
    }
  }, [])

  const attorney = businessList?.result?.find(
    (prod) => prod?.companyId === getRouterParamValue(aid, 'number'),
  )

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
        <title>{`EzyFind | Attorney - ${attorney?.companyName}`}</title>
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
      <HeroImage
        title={attorney?.companyName || ''}
        bgImageUrl="/assets/img/lawyer/search_result_banner.webp"
      />
      {loading ? (
        <Loading />
      ) : attorney ? (
        <Detail data={attorney} {...props} />
      ) : (
        <Empty text="No business" />
      )}
      <DownloadSection />
    </div>
  )
}

export default Attorney
