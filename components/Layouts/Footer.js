import config from "config/config.json";
import menu from "config/menu.json";
import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
import styles from "styles/footer.module.scss";

const Footer = () => {
  const { socialMedia, brands, parameter } = config;
  const { footer } = menu;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMenu}>
        <div className={`${common.container} container`}>
          <div className="row">
            {footer.map((menu, i) => (
              <div
                className={`col-md-3 col-6 mb-5 mb-md-0 ${styles.footerWidget}`}
                key={`footer-menu-${i}`}
              >
                <h3 className={`${styles.footerWidgetTitle} text-capitalize`}>
                  {menu.name}
                </h3>
                <ul className={styles.menu}>
                  {menu.pages.map((page, i) => (
                    <li key={`page-${i}`}>
                      <Link href={page.url}>
                        <a rel={page.rel}>{page.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerPartners}>
        <div className={`${common.container} container`}>
          <span className={styles.footerLabel}>Other Brands</span>
          <div className="row align-items-end">
            <div className="col-md-6 mb-5 mb-md-0">
              <div className="d-flex">
                {brands.map((brand, i) => (
                  <div
                    className={` ${
                      i == 0 ? "me-3 me-md-4 me-lg-5" : "mr-0 mt-2"
                    }`}
                    key={`brands-${i}`}
                  >
                    <Link href={brand.url}>
                      <a target="_blank" rel="noreferrer">
                        <Image
                          src={`${brand.logo}`}
                          alt={brand.name}
                          title={brand.name}
                          width="180"
                          height="57"
                        />
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3 mb-5 mb-md-0">
              <div className={styles.footerSocial}>
                <span>Follow Us</span>
                <ul className={` ${styles.socialMediaIcons} mt-1 p-0 mb-0`}>
                  {socialMedia.map((icon, i) => (
                    <li className="me-4" key={`socialMedia-${i}`}>
                      <Link href={icon.link}>
                        <a target="_blank" rel="nofollow noreferrer">
                          <Image
                            src={`${icon.icon}`}
                            height={20}
                            width={20}
                            alt={icon.name}
                          />
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.copyrightText}>
                <p className="text-left mb-2">{parameter.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
