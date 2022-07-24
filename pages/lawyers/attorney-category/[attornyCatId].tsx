import React from 'react'
import Head from 'next/head'
import referenceService from '@services/referenceService'
import { HeroImage } from '@views/components'
import { ArticleSection } from '@views/components/Article'
import { Empty, Loading } from '@views/elements'

/* StaticProps & StaticPaths*/
import { GetStaticPaths, GetStaticProps } from 'next'
import { apolloClient } from '@graphql/index'
import { Guest_Login } from '@services/authService/queries'

const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const result = await referenceService.getJobList(
    null,
    null,
    categoryId,
    9, // null
    null,
    'Business Details',
    null,
    null,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  const _postList = await referenceService.getPostList(
    null,
    null,
    categoryId,
    9, // null
    null,
    'Business Details',
    1,
    result?.count,
    response?.data?.guestLogin?.result?.value, // guest token
  )

  const paths = [
    ...(_postList?.map((e) => ({
      params: { attornyCatId: `${e?.postID || ''}` },
    })) || ['']),
  ].filter((e: any) => e?.params?.attornyCatId)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await apolloClient().query({
    query: Guest_Login,
  })
  const result = await referenceService.getPostList(
    Number(params?.attornyCatId),
    null,
    null,
    null,
    null,
    null,
    1,
    1,
    response?.data?.guestLogin?.result?.value, // guest token
  )
  const article = result[0]
  const title = article?.titleSEO || 'EzyFind | Article'
  const metaTags = {
    'og:title': title,
    'og:description':
      article?.descriptionSEO ||
      'Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys',
    'og:keywords':
      article?.keywordsSEO ||
      'Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa',
  }
  return { props: { article, metaTags, title } }
}

const ArticlePage = (props: any) => {
  const { article } = props

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
        <title>{article?.titleSEO || 'EzyFind | Article'}</title>
        <meta
          name="description"
          content={
            article?.descriptionSEO ||
            'Download Free 800+ Legal Contracts, Get Real-time advice & Find South Africa attorneys'
          }
        />
        <meta
          name="keywords"
          content={
            article?.keywordsSEO ||
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
        {article?.googleSchema && (
          <script type="application/ld+json">
            {article.googleSchema
              .replace(`<script type=\"application/ld+json\">\r\n{`, '')
              .replace(`}\r\n</script>`, '')}
          </script>
        )}
      </Head>
      {article ? (
        <>
          <HeroImage
            title={article?.title || ''}
            bgImageUrl="/assets/img/lawyer/special_list_details_banner.webp"
          />
          <ArticleSection data={article} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default ArticlePage
