import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '@views/lib/constants'

class WebDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function () {(function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                ga('create', '${config.googleAnalyticsKey}', 'auto');
                ga('send', 'pageview');}, 5000)`,
            }}
          ></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://www.LawyersEzyFind.co.za/",
                "logo": "https://www.LawyersEzyFind.co.za/images/Logo.png",
                "contactPoint": [{
                  "@type": "ContactPoint",
                  "telephone": "+27-11-056-9123",
                  "contactType": "customer service"
                }]
              }`,
            }}
          ></script>
          {/* Google Tag Manager  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function () {(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${config.googleTagMangerKey}');}, 5000)`,
            }}
          ></script>

          {/* Google adsense  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function () {
              (function () {
                  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                  s1.setAttribute('data-ad-client', '${config.googleAdsenseKey}');
                  s0.parentNode.insertBefore(s1, s0);
              })();}, 5000)`,
            }} 
          ></script>
         {/*  <script
            data-ad-client={config.googleAdsenseKey}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script> */}

          {/* Clarity tracking code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              setTimeout(function () {(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${config.clarityTrackingKey}");}, 5000)`,
            }}
          ></script>
          {/* live chat */}
          <script
            dangerouslySetInnerHTML={{
              __html: `setTimeout(function () {var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function () {
                  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = 'https://embed.tawk.to/5614ffa82ee46dc72a5d2929/default';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
              })();}, 5000)`,
            }} 
          ></script>

          <link rel="dns-prefetch" href="https://mobileapiv2.ezyfind.co.za" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.clarity.ms" />
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.googleTagMangerKey}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default WebDocument
