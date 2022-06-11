/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import { getDownloadData } from "@/lib/api";
import { getAllData, getSingleFile } from "@/lib/pages";
import Banner from "components/HomePage/Banner";
import Posts from "components/HomePage/Posts";
import Layout from "components/Layouts/Layout";
import config from "config/config.json";
import Script from "next/script";

const Home = ({ homePageData, products, productIndex, allDownloadData }) => {
  const { banner } = homePageData.frontmatter;
  const { logo, title, meta_image, description, site_url, meta_author } =
    config.parameter;

  return (
    <Layout
      title={homePageData.frontmatter.title}
      description={homePageData.frontmatter.description}
    >
      <Banner bannerData={banner} />
      <Posts
        productIndex={productIndex}
        products={products}
        allDownloadData={allDownloadData}
      />

      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "${site_url}#webpage",
            "name": "${title}",
            "description": "${description}",
            "image": "${meta_image}",
            "inLanguage": "en-US",
            "publisher": {
              "@type": "Organization",
              "name": "${meta_author}",
              "url": "${site_url}",
              "sameAs": ["https://www.facebook.com/themefisher","https://twitter.com/themefisher","https://www.github.com/themefisher","https://dribbble.com/themefisher/","https://www.pinterest.com/themefisher/"],
              "logo": {
                "@type": "ImageObject",
                "url": "${logo}"
              }
            }
          }
        `,
        }}
      />
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const homePageData = getSingleFile("content/_index.md");
  const allProducts = getAllData("content/products", false);
  const productIndex = getSingleFile("content/products/_index.md");
  const allDownloadData = await getDownloadData();

  return {
    props: {
      homePageData: homePageData,
      products: allProducts,
      productIndex: productIndex,
      allDownloadData: allDownloadData,
    },
  };
};
