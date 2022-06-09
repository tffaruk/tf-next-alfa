import { strip } from "@/lib/utils";
import Layout from "components/Layouts/Layout";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";

const Bundle = ({ bundleData: { frontmatter, content }, products }) => {
  const { description, title, meta_title, noindex, image, bundle_package } =
    frontmatter;

  // all html count
  const countHtml = products.filter(
    (product) =>
      product.frontmatter.type == "html" && product.frontmatter.price != 0
  ).length;

  // all hugo count
  const countHugo = products.filter(
    (product) => product.frontmatter.type == "hugo"
  ).length;

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <section className={`${common.sectionSm} ${common.bundleBanner}`}>
        <div className={`container ${common.container}`}>
          <div className="row">
            <div className="col-md-12 text-center mb-6">
              <h1
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: marked.parseInline(title) }}
              ></h1>
              <p
                className={`${common.desc} mb-4`}
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(description),
                }}
              ></p>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            {bundle_package.map((item, i) => (
              <div key={`item-${i}`} className="col-lg-6 col-xl-5">
                <div
                  className={`card border-0 shadow overflow-hidden rounded-3 h-100`}
                >
                  <div className="card-img-top img-cover">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      height={325}
                      width={540}
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div
                    className={`card-body d-block d-sm-flex align-items-center justify-content-between p-4`}
                  >
                    <div className="me-3">
                      <h4 className={`${common.bundleTitle} h5`}>
                        {item.title}
                      </h4>
                      <p className={`${common.bundleDesc} mb-0`}>
                        {item.type === "html"
                          ? item.subtitle.replace("<number>", countHtml - 1)
                          : item.subtitle.replace("<number>", countHugo - 1)}
                      </p>
                    </div>
                    <div className="text-start text-sm-end mt-3 mt-sm-0">
                      <Link href={item.button.url}>
                        <a className="stretched-link">
                          <span className="btn btn-sm btn-primary">
                            {item.button.label}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bundle;
