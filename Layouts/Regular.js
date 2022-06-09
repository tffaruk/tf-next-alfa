/* eslint-disable react/no-unescaped-entities */
import { strip } from "@/lib/utils";
import Layout from "components/Layouts/Layout";
import { marked } from "marked";
import common from "styles/common.module.scss";

export const Regular = ({ filterPost, slug }) => {
  const { title, description, meta_title, image, noindex } =
    filterPost[0].frontmatter;

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={
        description ? description : strip(filterPost[0].content.slice(0, 120))
      }
      image={image}
      noindex={noindex}
    >
      <section className={common.wrapper}>
        <div className={common.pageWrapper}>
          <div className={`${common.container} container`}>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className={common.globalTitle}>
                  <h1>{filterPost[0].frontmatter.title}</h1>
                </div>

                <div
                  className={common.content}
                  dangerouslySetInnerHTML={{
                    __html: marked(filterPost[0].content),
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
