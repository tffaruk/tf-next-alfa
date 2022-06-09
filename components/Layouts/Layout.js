/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Footer from "components/Layouts/Footer";
import Header from "components/Layouts/Header";
import config from "config/config.json";
import { strip } from "lib/utils";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import styles from "styles/header.module.scss";

const Layout = ({
  children,
  title,
  description,
  image,
  meta_title,
  noindex,
  canonical,
  progressBarEl,
  isBlogSingle,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => {
    setIsopen(!isOpen);
  };

  useEffect(() => {
    const changeNavbarBackground = () => {
      if (window.pageYOffset >= 500) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", changeNavbarBackground);

    if (progressBarEl) {
      const progressBar = () => {
        var winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        var height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var progressBar = document.getElementById("progressBar");
        if (progressBar) {
          if (window.pageYOffset >= 500) {
            progressBar.style.width = scrolled + "%";
          } else {
            progressBar.style.width = "0%";
          }
        }
      };
      window.addEventListener("scroll", progressBar);
    }
  });

  const { site_url, meta_image, meta_author } = config.parameter;
  const router = useRouter();

  return (
    <div
      className={`body ${
        isBlogSingle
          ? styles.navigationStatic
          : isFixed
          ? styles.navigationFixed
          : ""
      }`}
    >
      <Head>
        {/* meta_title? meta_title : title */}
        <title>{strip(meta_title ? meta_title : title)}</title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* description ? description : first 120 char from content */}
        <meta name="description" content={description} />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* meta_title? meta_title : title */}
        <meta property="og:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site_url}${router.asPath}`} />

        {/* meta_title? meta_title : title */}
        <meta name="twitter:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta name="twitter:description" content={description} />

        {/* image meta */}
        <meta
          property="og:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta
          name="twitter:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header toggle={toggle} isOpen={isOpen} blogProgressEL={progressBarEl} />
      {children}
      <Footer />

      {/* cookie consent */}
      <CookieConsent
        location="bottom"
        buttonText="I Accept"
        cookieName="site-cookies"
        style={{
          background: "#2B373B",
          justifyContent: "center",
          zIndex: "9999999",
        }}
        buttonStyle={{
          background: "#00719a",
          color: "#fff",
          fontSize: "13px",
          borderRadius: "5px",
        }}
        expires={150}
      >
        This site uses cookies to provide you with a greater user experience. To
        find out more read our updated{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </CookieConsent>

      {isFixed && (
        <Script
          id="thrivedesk-assistant"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e,n){function s(){const t=e.getElementsByTagName('script')[0],n=e.createElement('script');n.type='text/javascript',n.async=!0,n.src='https://assistant.thrivedesk.io/bootloader.js?'+Date.now(),t.parentNode.insertBefore(n,t)}if(t.Assistant=n=function(e,n,s){t.Assistant.readyQueue.push({method:e,options:n,data:s})},n.readyQueue=[],'complete'===e.readyState)return s();t.attachEvent?t.attachEvent('onload',s):t.addEventListener('load',s,!1)}(window,document,window.Assistant||function(){}),window.Assistant('init','941671dc-0089-4bb7-8b73-0b3c0d636839');
              `,
          }}
        />
      )}
    </div>
  );
};

export default Layout;
