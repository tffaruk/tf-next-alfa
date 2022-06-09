import BundleBanner from "components/Bundle/BundleBanner";
import BundleCta from "components/Bundle/BundleCta";
import BundleFaq from "components/Bundle/BundleFaq";
import BundleProducts from "components/Bundle/BundleProducts";
import Layout from "components/Layouts/Layout";
import React from "react";

const SingleBundle = ({ dataContents, bundleData, products }) => {
  const { banner_image, call_to_action } = bundleData;
  const {
    faq,
    title,
    subtitle,
    description,
    meta_title,
    image,
    noindex,
    button,
    bundle,
  } = dataContents[0].frontmatter;

  const content = dataContents[0].content;

  const productByBundle = products.posts.filter(
    (product) => product.frontmatter.type == bundle
  );
  const countLength = productByBundle.filter(
    (product) => product.frontmatter.price != 0
  ).length;

  // all hugo count

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
    >
      <BundleBanner
        products={products}
        banner_image={banner_image}
        button={button}
        title={title}
        subtitle={subtitle}
        bundleLength={countLength}
      />
      <BundleProducts products={products} bundle={bundle} content={content} />
      <BundleFaq faq={faq} />
      <BundleCta call_to_action={call_to_action} button={button} />
    </Layout>
  );
};

export default SingleBundle;
