import { sortByDate, sortByWeight } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "styles/products.module.scss";

const Products = ({
  products,
  search,
  setModalIsOpen,
  weight,
  allDownloadData,
}) => {
  const filterByWeight = products.filter(
    (product) => product.frontmatter.weight > 0
  );

  const productsByWeight = sortByWeight(filterByWeight);
  const productsByDate = sortByDate(products);
  const filterWeightProducts = productsByDate.filter(
    (product) => !productsByWeight.includes(product)
  );

  const allProducts = !weight
    ? [...productsByWeight, ...filterWeightProducts]
    : products;
  //

  return (
    <div className="row gx-4 gy-5 gx-lg-5 justify-content-center">
      {allProducts.map((product, i) => (
        <div
          className={`col-lg-4 col-md-6 ${styles.productGridItem} ${
            i == 2 && "d-md-none d-lg-block"
          } `}
          key={`product-${i}`}
        >
          <div className={`${styles.productItem} h-100`}>
            <div className={styles.productThumb}>
              <Link href={`/products/${product.slug}`}>
                <a
                  className="img-cover"
                  onClick={() => search && setModalIsOpen(false)}
                >
                  <Image
                    width="426"
                    height="320"
                    src={product.frontmatter.image}
                    alt={`${product.frontmatter.title} thumbnail`}
                    blurDataURL={product.frontmatter.image}
                  />
                </a>
              </Link>
            </div>

            <div className={`${styles.productContent}`}>
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  <h3 className="mb-0">
                    <Link href={`/products/${product.slug}`} passHref>
                      <a>{product.frontmatter.title}</a>
                    </Link>
                  </h3>
                  {product.frontmatter.subtitle && (
                    <p className="mb-0 mt-1">
                      {!search && product.frontmatter.subtitle}
                    </p>
                  )}
                </div>
                <div className="text-end">
                  <strong className="lead d-block">
                    {product.frontmatter.price === 0
                      ? `Free`
                      : `$${product.frontmatter.price}.00`}
                  </strong>

                  {allDownloadData &&
                    allDownloadData.map(
                      (data, i) =>
                        data.name == product.frontmatter.title && (
                          <React.Fragment key={`key-${i}`}>
                            <svg height="12" width="12" viewBox="0 0 287 287">
                              <path d="M138 147.8a7.8 7.8 0 0 0 6.3 3.5c2.5 0 4.9-1.3 6.4-3.5l40.4-57.6c1.7-2.4 2-5 .8-7.3s-3.7-3.4-6.6-3.4H165v-55c0-5-3.2-9-8.2-9h-25a9 9 0 0 0-8.8 9v55h-19.6c-3 0-5.4 1.1-6.6 3.4-1.2 2.3-.9 5 .8 7.4l40.3 57.5zM287 199.5a13 13 0 0 0-13-13H13a13 13 0 0 0-13 13v59a13 13 0 0 0 13 13h261a13 13 0 0 0 13-13v-59zm-229 45H19v-31h39v31zm55 0H74v-31h39v31z" />
                            </svg>
                            <span
                              key={`download-${i}`}
                              className="mt-2 mb-0 ms-1"
                            >
                              {data.download}
                            </span>
                          </React.Fragment>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
