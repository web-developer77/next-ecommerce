import React from "react";
import Head from "next/head";

import { HeroImage } from "@views/components";
import ConfirmForm from "@views/components/ForgotForm/ConfirmForm";

const ForgotPasswordGuid = (props: any) => {
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
        <title>EzyFind | Forgot Password</title>
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
      <HeroImage title="Forgot Password" bgImageUrl="/assets/img/tyre_bg.jpg" />
      <ConfirmForm {...props} />
    </div>
  );
};

export default ForgotPasswordGuid;
