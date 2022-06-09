import Products from "components/Products";
import { marked } from "marked";
import common from "styles/common.module.scss";

const BundleProducts = ({ products, bundle, content }) => {
  const bundleProducts = products.posts.filter(
    (product) => product.frontmatter.bundle
  );
  const bundleData = bundleProducts.filter(
    (product) =>
      product.frontmatter.type == bundle && product.frontmatter.price != 0
  );

  return (
    <section className={`${common.section} ${common.bundleCategory}`}>
      <div className={`container ${common.container}`}>
        <div className="row mb-5 py-5">
          <div className="col-md-12 text-center">
            <div
              dangerouslySetInnerHTML={{
                __html: marked
                  .parse(content)
                  .replace("<number>", bundleData.length - 1),
              }}
            ></div>
          </div>
        </div>
        <Products products={bundleData} />
      </div>
    </section>
  );
};

export default BundleProducts;
