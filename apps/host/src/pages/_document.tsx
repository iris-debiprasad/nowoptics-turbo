{
  /* @ts-nocheck */
}
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { Head, Html, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* // * Note: [IR-1836] we have moved fonts in head with preconnect and preload  */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap" />
        <link rel="preload" href="https://dam.nowoptics.net/m/fa378efdeaa4704/original/Latinotype-Recoleta_Regular.woff" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="https://dam.nowoptics.net/m/75f75f70bafd0c77/original/Latinotype-Recoleta_SemiBold.woff" type="font/woff" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <link
          rel="icon"
          href={ImageUrlConstants.FAV_ICON.SO}
          type="image/png"
          sizes="32x32"
        />
        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://load.gtm.stantonoptical.com/mnkvdebu.js?st=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "MTLVGTD");`,
          }}
        ></script>

        {/* eslint-disable-next-line @next/next/next-script-for-ga, @next/next/no-sync-scripts */}
        {/* {process.env.NEXT_PUBLIC_RECAPTCHA_ENABLE === "true" && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <Script
            strategy="lazyOnload"
            src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_APP_GOOGLE_CAPTCHA_SITE_KEY}`}
          ></Script>
        )} */}
        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `var ScarabQueue = ScarabQueue || [];
            (function(id) {
            if (document.getElementById(id)) return;
            var js = document.createElement('script'); js.id = id;
            js.src = '//cdn.scarabresearch.com/js/1815B9DBC5A8E465/scarab-v2.js';
            var fs = document.getElementsByTagName('script')[0];
            fs.parentNode.insertBefore(js, fs);
            })('scarab-js-api');`,
          }}
        ></script>
        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `var UnbxdSiteName = "${process.env.NEXT_PUBLIC_UNBXD_SITE_KEY}";
            var UnbxdApiKey = "${process.env.NEXT_PUBLIC_UNBXD_API_KEY}";
            (function() {
              var ubx = document.createElement('script');
              ubx.type = 'text/javascript';
              ubx.async = true;
              ubx.src = '//libraries.unbxdapi.com/ua-js/v1.0.0/uaLibrary.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ubx);
            })();`,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://load.gtm.stantonoptical.com/ns.html?id=GTM-MTLVGTD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
