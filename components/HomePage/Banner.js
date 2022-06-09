import { marked } from "marked";
import Link from "next/link";
import styles from "styles/banner.module.scss";
import common from "styles/common.module.scss";

// homepage-banner
const Banner = ({
  bannerData: { title, subtitle, background_image, button },
}) => {
  return (
    <section
      className={`${styles.banner} ${styles.homepageBanner}`}
      style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className={`container ${common.container}`}>
        <div className={styles.block}>
          <div className="row flex-column text-center text-lg-start align-items-center align-items-lg-start">
            <div className="col-lg-6">
              <h1
                className="mb-3 text-capitalize"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(title),
                }}
              ></h1>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-8 col-sm-10">
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(subtitle),
                }}
              ></p>
              {button.enable && (
                <Link href={button.link}>
                  <a className="btn btn-primary text-capitalize">
                    {button.label}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
