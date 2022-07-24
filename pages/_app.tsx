import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../graphql'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import AuthProvider from '../views/containers/AuthProvider'
import { ToastProvider } from 'react-toast-notifications'
import { categoryData, config } from '@views/lib/constants'
//  @ts-ignore
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@styles/main.scss'

class MyApp extends App {
  render() {
    const { Component, pageProps: { metaTags, title, ...rest } } = this.props

    return (
      <ToastProvider>
        <Provider store={store}>
          <ApolloProvider client={apolloClient()}>
            <Head>
              <title>{title || "Lawyers EzyFind"}</title>
              <meta property="og:title" content="Lawyers EzyFind" key="og:title" />
              <meta
                property="og:description"
                content="LawyersEzyFind Helps You To Find Contract Lawyers, Tax Attorneys, Free Agreements & Legal Lawyers In South Africa, Download 800 Legal Contracts For Free, Get Instant Legal Advice, And Locate South African Lawyers."
                key="og:description"
              />
              <meta
                property="og:keywords"
                content="Download Free Legal Contracts, lease agreements, iANC, antenuptial,legal agreements online south africa, Contract Lawyer, Attorneys In Durban, Find A Law Attorney Firm, Lawyer Durban, Agreements Lawyer, Find A Law Firm, Legal Lawyers, Free Lawyers, Attorneys In Johannesburg, Free Attorney, Tax Attorney, Legal South Africa"
                key="og:keywords"
              />
              {metaTags &&
                Object.entries(metaTags).map((entry: any) => (
                  <meta property={entry[0]} content={entry[1]} key={entry[0]} />
                ))}
            </Head>
            <AuthProvider categoryData={{ ...categoryData, config }}>
              <Component
                {...rest}
                categoryData={{ ...categoryData, config }}
              />
            </AuthProvider>
          </ApolloProvider>
        </Provider>
      </ToastProvider>
    )
  }
}

export default MyApp
