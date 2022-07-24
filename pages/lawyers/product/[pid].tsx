import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Dispatch } from 'redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createSelector } from 'reselect'
import { Container, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import productsService from '@services/productsService'
import referenceService from '@services/referenceService'
import { GetProducts } from '@services/productsService/__generated__/GetProducts'
import {
  setProductList,
  setLegalList,
} from '@views/containers/HomePage/homePageSlice'
import { makeSelectProducts } from '@views/containers/ProductDetail/selectors'

import {
  DetailSection,
  DescriptionSection,
  SimilarProductSection,
  DownloadSection,
} from '@views/components'

import { Loading } from '@views/elements'
import { getRouterParamValue } from '@views/lib/helper'

/* StaticProps & StaticPaths*/
import { GetStaticPaths, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'

const _categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const categoryIds = await referenceService.getCategoryListByParentId(
    _categoryId,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  const result = await productsService.getPrdProductList(
    null,
    null,
    null,
    null,
    null,
    `${_categoryId},${categoryIds.map((e) => e?.categoryId).join()}`,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  const _productList = await productsService.getPrdProductList(
    null,
    null,
    null,
    null,
    null,
    `${_categoryId},${categoryIds.map((e) => e?.categoryId).join()}`,
    null,
    null,
    null,
    null,
    result?.count,
    null,
    null,
    response?.data?.guestLogin?.result?.value, // guest token
  )

  const paths = [
    ...(_productList?.result?.map((e) => ({
      params: { pid: `${e?.productID || ''}` },
    })) || ['']),
  ].filter((e: any) => e?.params?.pid)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  let product: any = null
  if (params?.special) {
    const result = await productsService.getMstSpecialList(
      Number(params?.special),
      null,
      null,
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
    product = result?.result && result.result[0]
  } else if (params?.mag) {
    const result = await productsService.getMagazinesList(
      null,
      Number(params?.pid),
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
    product = result?.result && result.result[0]
  } else {
    const result = await productsService.getPrdProductList(
      null,
      Number(params?.pid),
      null,
      null,
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
    product = result?.result && result.result[0]
  }
  const title = `Lawyers EzyFind ${product && `| ${product.productName}`}`
  const metaTags = {
    'og:title': title,
    'og:description':
      product?.description ||
      'Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys',
    'og:keywords':
      product?.description ||
      'Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa',
  }
  return { props: { product, metaTags, title } }
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProductList: (page: GetProducts[]) => dispatch(setProductList(page)),
  setLegalList: (page: GetProducts[]) => dispatch(setLegalList(page)),
})

const stateSelector = createSelector(makeSelectProducts, (products) => ({
  products,
}))

const ProductDetail = (props: any) => {
  const { product } = props
  const { products } = useAppSelector(stateSelector)

  const _similarProducts = products?.filter(
    (prod) => prod?.categoryName === product?.categoryName,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [similarLoading, setSimilarLoading] = useState<boolean>(false)
  const [similarProducts, setSimilarProducts] = useState<Array<any> | null>(
    _similarProducts,
  )

  const fetchSimilarProductList = async (categoryId: number | null) => {
    setSimilarLoading(true)
    const result = await productsService
      .getPrdProductList(
        null,
        null,
        null,
        null,
        categoryId,
        `${_categoryId}`,
        null,
        null,
        null,
        null,
        10,
        1,
        null
      )
      .catch((err) => {
        console.log('Error', err)
      })
    setSimilarLoading(false)
    if (result) {
      const response: any = result
      setSimilarProducts(response?.result)
    }
  }

  useEffect(() => {
    if (!similarProducts || !similarProducts.length) {
      fetchSimilarProductList(product?.categoryID)
    }
  }, [])

  return (
    <div className="fluid-container">
      <Head>
        <title>Lawyers EzyFind {product && `| ${product.productName}`}</title>
        <meta
          property="og:title"
          content={`Lawyers EzyFind ${product && `| ${product.productName}`}`}
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="" />
        <meta
          name="description"
          content={
            product?.description ||
            'Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys'
          }
        />
        <meta
          name="keywords"
          content={
            product?.description ||
            'Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa'
          }
        />
        <meta name="apple-itunes-app" content="app-id=980233151" />
        <meta name="google-play-app" content="app-id=com.INNOVEzyFind" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/assets/img/favicon.png"
        />
        {product?.googleSchema && (
          <script type="application/ld+json">
            {product.googleSchema
              .replace(`<script type=\"application/ld+json\">\r\n{`, '')
              .replace(`}\r\n</script>`, '')}
          </script>
        )}
      </Head>
      {loading ? (
        <Loading />
      ) : product ? (
        <Container fluid>
          <Row className="ezy-container mx-auto">
            <Col md={{ span: 10, offset: 1 }} xs={12}>
              <div className="breadcrumbs clearfix">
                <ul className="clearfix mb-0">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>{product?.categoryName}</li>
                </ul>
              </div>
            </Col>
          </Row>
          <DetailSection product={product} />
          <DescriptionSection product={product} />
          {similarLoading ? (
            <Loading />
          ) : similarProducts?.length ? (
            <SimilarProductSection products={similarProducts} />
          ) : null}
          <DownloadSection />
        </Container>
      ) : (
        <h1 className="m-5 text-center">Not existing product</h1>
      )}
    </div>
  )
}

export default ProductDetail
