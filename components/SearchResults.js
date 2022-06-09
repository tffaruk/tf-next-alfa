import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
import styles from "styles/search.module.scss";

const SearchResults = ({ products, setModalIsOpen, defaultData }) => {
  return (
    <div className="row mx-0 mx-md-1">
      {products.length > 0
        ? products.map((product, i) => (
            // search result card
            <div className={`col-sm-6 mb-4`} key={`product-${i}`}>
              <div
                className={`d-flex position-relative ${styles.searchResultCard}`}
              >
                <div className={`me-3 ${styles.searchResultImage}`}>
                  <Link href={`/products/${product.slug}`}>
                    <a
                      className={`d-block rounded-3 overflow-hidden ${common.shadowLg}`}
                      onClick={() => setModalIsOpen(false)}
                      style={{ lineHeight: 0 }}
                    >
                      <Image
                        width="130"
                        height="98"
                        src={product.frontmatter.image}
                        alt={`${product.frontmatter.title} thumbnail`}
                        blurDataURL={product.frontmatter.image}
                      />
                    </a>
                  </Link>
                </div>

                <div className="align-self-center mt-2 mt-sm-0">
                  <h3
                    className="h5 mb-1 lh-1"
                    onClick={() => setModalIsOpen(false)}
                  >
                    <Link href={`/products/${product.slug}`} passHref>
                      <a className="lh-1 stretched-link">
                        {product.frontmatter.title}
                      </a>
                    </Link>
                  </h3>
                  <p className="mb-0 small lh-base">
                    {product.frontmatter.subtitle}
                  </p>
                  <p className="mb-0 small fw-medium lh-0">
                    {product.frontmatter.categories.map((category, i) => (
                      <span key={i} className="me-2 mt-1 d-inline-block">
                        <Link href={`/categories/${category}`}>
                          <a
                            className="small text-capitalize d-inline-block"
                            onClick={() => setModalIsOpen(false)}
                          >
                            {category}
                          </a>
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))
        : defaultData.map((product, i) => (
            // recommended product card
            <div
              className={`col-md-3 col-sm-4 col-6 mb-4`}
              key={`product-${i}`}
            >
              <Link href={`/products/${product.slug}`}>
                <a
                  className={`d-block rounded-3 overflow-hidden ${common.imageCover} ${common.shadowLg}`}
                  onClick={() => setModalIsOpen(false)}
                  style={{ lineHeight: 0 }}
                >
                  <Image
                    width="210"
                    height="158"
                    src={product.frontmatter.image}
                    alt={`${product.frontmatter.title} thumbnail`}
                    blurDataURL={product.frontmatter.image}
                  />
                </a>
              </Link>

              <div className="mt-3">
                <h3
                  className="h5 mb-1 lh-1"
                  onClick={() => setModalIsOpen(false)}
                >
                  <Link href={`/products/${product.slug}`} passHref>
                    <a className="text-dark lh-1">
                      {product.frontmatter.title}
                    </a>
                  </Link>
                </h3>
                <p className="mb-0 small lh-base">
                  {product.frontmatter.subtitle}
                </p>
                <p
                  className="mb-0 small fw-medium mt-1"
                  style={{ lineHeight: 0 }}
                >
                  {product.frontmatter.categories.map((category, i) => (
                    <span
                      key={i}
                      className="me-2 mt-1 d-inline-block"
                      style={{ lineHeight: 1.2 }}
                    >
                      <Link href={`/categories/${category}`}>
                        <a
                          className="small text-capitalize d-inline-block"
                          onClick={() => setModalIsOpen(false)}
                        >
                          {category}
                        </a>
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SearchResults;
