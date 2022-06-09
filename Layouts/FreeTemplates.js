import Features from "components/Features";
import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import { useAppContext } from "context/state";
import { marked } from "marked";
import { useEffect, useState } from "react";
import common from "styles/common.module.scss";
import styles from "styles/products.module.scss";

const FreeTemplates = ({
  freeTemplates,
  products,
  featuresData,
  allDownloadData,
}) => {
  const { frontmatter } = freeTemplates[0];
  const freeProducts = products.posts.filter(
    (product) =>
      product.frontmatter.type === "html" && product.frontmatter.price == 0
  );
  const premiumTemplates = products.posts.filter(
    (product) =>
      product.frontmatter.type === "html" && product.frontmatter.price != 0
  );
  const { category } = useAppContext();

  // state
  const [productData, setProductData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const filterData = (e, index) => {
    setEditIndex((editIndex) => (editIndex === index ? index : index));

    setIsActive(!isActive);
    const categoryProduct = freeProducts.filter((product) =>
      product.category.includes(e)
    );

    if (e == "All Themes") {
      setIsActive(false);
      setProductData(freeProducts);
    } else if (e != "All Themes") {
      setIsActive(true);
      setProductData(categoryProduct);
    } else {
      setProductData(freeProducts);
    }
  };

  useEffect(() => {
    setProductData(freeProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={frontmatter.meta_title}>
      <section className={`${common.sectionSm} ${common.bundleBanner}`}>
        <div className={`container ${common.container}`}>
          <div className="row">
            <div className="col-md-12 text-center mb-4">
              <h1
                className="mb-3 h2"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(frontmatter.title),
                }}
              ></h1>
              <p
                className={`${common.desc} mb-4`}
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(frontmatter.description),
                }}
              ></p>
            </div>
            <div className="col-12 text-center mb-6">
              <div className={`list-inline ${styles.filterControls}`}>
                <button
                  data-filter="all"
                  className={`list-inline-item ${
                    !isActive ? styles.active : ""
                  }`}
                  value="All Themes"
                  onClick={(e) => filterData(e.target.value)}
                >
                  All Themes<span>{freeProducts.length}</span>
                </button>
                {category.map(
                  (cat, i) =>
                    freeProducts.filter((category) =>
                      category.frontmatter.categories.includes(cat)
                    ).length > 0 && (
                      <button
                        data-filter="all"
                        className={`list-inline-item ${
                          editIndex == i ? styles.active : ""
                        } `}
                        key={i}
                        value={cat}
                        onClick={(e) => filterData(e.target.value, i)}
                      >
                        {cat}
                        <span>
                          {
                            freeProducts.filter((category) =>
                              category.frontmatter.categories.includes(cat)
                            ).length
                          }
                        </span>
                      </button>
                    )
                )}
              </div>
            </div>
          </div>
          <Products products={productData} allDownloadData={allDownloadData} />
        </div>
      </section>
      <section className={`${common.section} ${common.bgGray}`}>
        <div className={`container ${common.container}`}>
          <div className="row mt-6">
            <div className="col-md-12 text-center mb-6">
              <h2
                className="mb-3"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(frontmatter.premium_section.title),
                }}
              ></h2>
              <p
                className={`${common.desc} mb-4`}
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(
                    frontmatter.premium_section.description
                  ),
                }}
              ></p>
            </div>
          </div>
          <Products products={premiumTemplates} />
        </div>
      </section>
      <Features featureData={featuresData} />
    </Layout>
  );
};

export default FreeTemplates;
