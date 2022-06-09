/* eslint-disable react/no-unescaped-entities */
import { kebabCase } from "@/lib/slugger";
import { similerProduct } from "@/lib/utils";
import config from "config/config.json";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import common from "styles/common.module.scss";
import styles from "styles/singleDownload.module.scss";

const ProductCard = ({ singleProduct, productLists, handleUpdate }) => {
  const { bundle } = config;
  const { frontmatter, slug } = singleProduct[0];
  const { title, type, price, demo, download } = frontmatter;

  const [isBundlePopupOpen, setIsBundlePopupOpen] = useState(false);

  // similer products
  const similerProducts = similerProduct(
    productLists,
    singleProduct,
    slug,
    type
  );

  // list of premiumProducts
  const premiumProducts = similerProducts.filter((product) => {
    return product.frontmatter.price != 0 && product;
  });

  // total length of hugo products
  const countHugo = productLists.filter(
    (product) =>
      product.frontmatter.type == "hugo" && product.frontmatter.price != 0
  ).length;

  // total length of html products
  const countHtml = productLists.filter(
    (product) =>
      product.frontmatter.type == "html" && product.frontmatter.price != 0
  ).length;

  // map hugo products
  const hugoPrice = productLists.map((p) => {
    if (p.frontmatter.type == "hugo") {
      return p.frontmatter.price;
    }
    return 0;
  });

  // map html products
  const htmlPrice = productLists.map((p) => {
    if (p.frontmatter.type == "html") {
      return p.frontmatter.price;
    }
    return 0;
  });

  const initialValue = 0;
  // total price of hugo products
  const totalHugoPrice = hugoPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  // total price of html products
  const totalHtmlPrice = htmlPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return (
    <div className={`${styles.productSidebar} card`}>
      <div className={styles.cardBody}>
        <h1 className={`${styles.productHeader} text-center`}>{title}</h1>
        <h2 className={`text-center ${styles.productPrice}`}>
          {price === 0 ? `Free` : `$${price}.00`}
        </h2>

        <ul className={`list-inline mt-3 mb-0 ${styles.productButtons}`}>
          <li>
            <Link
              href={
                demo
                  ? demo
                  : `https://demo.themefisher.com/${kebabCase(title)}/`
              }
            >
              <a
                target="_blank"
                className={`btn btn-demo mb-3`}
                rel="noreferrer"
              >
                Live Preview
              </a>
            </Link>
          </li>
          <li>
            {price == 0 ? (
              <Link
                href={`https://download.themefisher.com/${kebabCase(
                  title
                )}.zip`}
              >
                <span
                  className="btn btn-primary d-block"
                  onClick={() => handleUpdate()}
                >
                  Free Download
                </span>
              </Link>
            ) : (
              <>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setIsBundlePopupOpen(true)}
                >
                  Purchase Now
                </button>
              </>
            )}
          </li>
        </ul>
        {type === "hugo" && (
          <>
            <p className={`${styles.lineText} text-center mt-4`}>
              <span>OR</span>
            </p>
            <div
              className={`${styles.bundleOffer} ${styles.bundleOfferBox} text-center`}
            >
              <Link href={bundle.link}>
                <a className="d-block stretched-link text-white">
                  <h4>{bundle.title}</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(bundle.subtitle),
                    }}
                  ></p>
                  <span className="font-weight-bold text-white d-block">
                    {bundle.label}
                  </span>
                </a>
              </Link>
            </div>
          </>
        )}

        <div
          className={`${styles.bundlePopup} ${
            isBundlePopupOpen ? `${styles.bundlePopupShow}` : ""
          }`}
        >
          <div
            className={styles.bundlePopupToggler}
            onClick={() => setIsBundlePopupOpen(false)}
          ></div>
          <div className={`${styles.bundlePopupContent} p-5 p-md-6`}>
            <div className="mb-3 text-center">
              <h4 className={`mb-2 ${styles.bundlePopupTitle}`}>
                Upgrade to the{" "}
                <Link
                  href={type === "html" ? "/bootstrap-bundle" : "/hugo-bundle"}
                >
                  Mega Bundle
                </Link>{" "}
                and save{" "}
                <span className="text-primary fw-bold">
                  ${type == "html" ? totalHtmlPrice - 59 : totalHugoPrice - 99}
                </span>
                !!
              </h4>
              <p className="lead mb-5">
                Did you know that just for $
                {type == "html" ? 59 - price : 99 - price} more you can upgrade
                to the unlimited pass and get access to download{" "}
                {type == "html" ? countHtml - 1 : countHugo - 1}+ (including
                these) template as well as all upcoming releases lifetime.
              </p>
            </div>
            <div className="row">
              {premiumProducts.slice(0, 4).map((product, i) => (
                // similer products
                <div
                  className={`col-lg-3 col-md-4 col-6 ${
                    i == 3 && "d-none d-lg-block"
                  } ${i == 2 && "d-none d-md-block"} `}
                  key={`product-${i}`}
                >
                  <Link href={`/products/${product.slug}`}>
                    <a
                      className={`d-block rounded-3 overflow-hidden ${common.imageCover} ${common.shadowLg}`}
                      style={{ lineHeight: 0 }}
                      onClick={() =>
                        setTimeout(() => setIsBundlePopupOpen(false), 500)
                      }
                    >
                      <Image
                        width="250"
                        height="150"
                        src={product.frontmatter.image}
                        alt={`${product.frontmatter.title} thumbnail`}
                        blurDataURL={product.frontmatter.image}
                      />
                    </a>
                  </Link>

                  <div className="mt-3">
                    <h3 className="h5 mb-2 lh-1 d-flex justify-content-between align-items-center">
                      <Link href={`/products/${product.slug}`} passHref>
                        <a className="text-dark lh-1">
                          {product.frontmatter.title}
                        </a>
                      </Link>

                      <strong className="small ms-1">
                        ${product.frontmatter.price}
                      </strong>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link
                href={`https://account.themefisher.com/checkout?edd_action=add_to_cart&download_id=${download}&edd_options%5Bprice_id%5D=1`}
              >
                <a
                  className="d-inline-block link-secondary mx-2 mb-4"
                  rel="noreferrer"
                >
                  No I Don't want this Offer
                </a>
              </Link>
              <Link
                href={
                  type == "html"
                    ? "https://account.themefisher.com/checkout?edd_action=add_to_cart&download_id=29705&edd_options%5Bprice_id%5D=1"
                    : "https://account.themefisher.com/checkout?edd_action=add_to_cart&download_id=778120&edd_options%5Bprice_id%5D=1"
                }
              >
                <a
                  className={`btn btn-lg btn-primary mx-2`}
                  rel="noreferrer"
                  style={{ width: "300px", maxWidth: "100%" }}
                >
                  Grab this Deal!
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
