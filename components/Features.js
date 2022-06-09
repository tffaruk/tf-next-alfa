import { marked } from "marked";
import Image from "next/image";
import common from "styles/common.module.scss";

const Features = ({ featureData }) => {
  const { title, features_item } = featureData.frontmatter;

  return (
    <section className={`${common.section} ${common.templateFeatures} pt-0 `}>
      <div className={`container ${common.container}`}>
        <div className="row justify-content-center">
          <div className={`col-xl-8 col-lg-10 ${common.sectionTitle}`}>
            <div className={` ${common.textCenter} text-center mb-5`}>
              <h2 className={common.title}>{title}</h2>
            </div>
            {features_item.map((feature, i) => (
              <div
                key={`feature-${i}`}
                className={`${
                  i % 2 != 0 && common.bgGray + " " + common.shadow
                } p-6 rounded-3`}
              >
                <div
                  className={"row justify-content-between align-items-center"}
                  key={i}
                >
                  <div
                    className={`col-md-5 ${
                      i % 2 != 0 ? "order-0 order-md-1" : "order-0"
                    }`}
                  >
                    <Image
                      className="image-fluid"
                      src={feature.thumbnail}
                      alt={feature.name}
                      width="505"
                      height="429"
                      blurDataURL={feature.thumbnail}
                    />
                  </div>
                  <div
                    className={`col-md-7 order-1 order-md-0 ${common.featureBoxContent}`}
                  >
                    <div
                      className={`${common.sectionTitle} ${common.textCenter} ${common.textXlStart} `}
                    >
                      <h3
                        className={`${common.title} mb-3 pt-0`}
                        dangerouslySetInnerHTML={{
                          __html: marked.parseInline(feature.name),
                        }}
                      />
                      <p
                        className="mb-4"
                        dangerouslySetInnerHTML={{
                          __html: marked.parseInline(feature.content),
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
