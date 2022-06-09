import Products from "components/Products";
import config from "config/config.json";
import Link from "next/link";
import common from "styles/common.module.scss";
import styles from "styles/products.module.scss";

const Posts = ({ products, productIndex, allDownloadData }) => {
  const { show_products } = config.parameter;

  const { posts } = products;
  const freeProducts = posts.filter(
    (product) => product.frontmatter.price == 0
  );

  const { title, subtitle, button } = productIndex.frontmatter;
  return (
    <section
      id="products"
      className={`${common.section} ${styles.handpickedProducts}`}
    >
      <div className={`container ${common.container}`}>
        <div className="row mb-3">
          <div
            className={`col-xl-6 col-lg-7 col-md-9 mx-auto ${common.sectionTitle}`}
          >
            <div className={`${common.textCenter} pb-6 text-center `}>
              <h2 className={`mb-3`}>{title}</h2>
              <p className={`${common.desc} mb-0`}>{subtitle}</p>
            </div>
          </div>
        </div>

        <Products
          products={freeProducts.slice(0, show_products)}
          allDownloadData={allDownloadData}
          bg_black="true"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="text-center mt-5 pt-5">
              {button.enable && (
                <Link href={button.link}>
                  <a className="btn btn-primary">{button.label}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
