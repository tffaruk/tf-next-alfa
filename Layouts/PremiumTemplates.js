import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import { marked } from "marked";
import common from "styles/common.module.scss";

const PremiumTemplates = ({ dataContents, products }) => {
  const { frontmatter } = dataContents[0];
  const premiumTemplates = products.posts.filter(
    (product) => product.frontmatter.price != 0
  );
  const premiumHtmlTemplate = premiumTemplates.filter(
    (data) => data.frontmatter.type == "html"
  );

  return (
    <Layout title={frontmatter.meta_title}>
      <section className={`${common.sectionSm} ${common.bundleBanner}`}>
        <div className={`container ${common.container}`}>
          <div className="row">
            <div className="col-xl-6 col-lg-10 mx-auto text-center mb-6">
              <h1
                className="mb-3"
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
          </div>
          <Products products={premiumHtmlTemplate} />
        </div>
      </section>
    </Layout>
  );
};

export default PremiumTemplates;
