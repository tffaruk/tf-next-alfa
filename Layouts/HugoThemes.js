import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import { marked } from "marked";
import common from "styles/common.module.scss";

const HugoThemes = ({ dataContents, products }) => {
  const { frontmatter, content } = dataContents[0];
  const hugoThemes = products.posts.filter(
    (product) => product.frontmatter.type == "hugo"
  );
  return (
    <Layout title={frontmatter.meta_title}>
      <section className={`${common.sectionSm} ${common.bundleBanner}`}>
        <div className={`container ${common.container}`}>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-10 mx-auto text-center mb-6">
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
          <Products products={hugoThemes} />
        </div>
      </section>
    </Layout>
  );
};

export default HugoThemes;
