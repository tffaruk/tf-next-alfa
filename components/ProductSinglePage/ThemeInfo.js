import { kebabCase } from "@/lib/slugger";
import { dateFormat } from "@/lib/utils";
import Changelog from "components/Changelog";
import Link from "next/link";
import styles from "styles/singleDownload.module.scss";

const ThemeInfo = ({
  singleProduct,
  changelogData,
  showChangelog,
  downloadData,
}) => {
  const {
    title,
    date,
    license,
    type,
    last_update,
    hugo_version,
    bootstrap_version,
    theme_version,
    documentation,
  } = singleProduct[0].frontmatter;

  return (
    <div className={`${styles.productSidebar} card mt-4`}>
      <div className={styles.cardBody}>
        <ul className={`list-unstyled mb-0 ${styles.productMeta}`}>
          <h4 id="themeInfo" className={`${styles.productSidebarTitle} mb-3`}>
            Theme Information
          </h4>
          <li className="d-flex align-items-center justify-content-between">
            <span>Release Date</span>
            <span>{dateFormat(date)}</span>
          </li>
          <li className="d-flex align-items-center justify-content-between">
            <span>Update Date</span>
            <span>{dateFormat(last_update)}</span>
          </li>
          {license && (
            <li className="d-flex align-items-center justify-content-between">
              <span>License</span>
              <span>{license}</span>
            </li>
          )}
          {type && (
            <li className="d-flex align-items-center justify-content-between">
              <span>Product Type</span>
              <span>{type.toUpperCase()}</span>
            </li>
          )}
          {bootstrap_version && (
            <li className="d-flex align-items-center justify-content-between">
              <span>Bootstrap Version</span>
              <span>{bootstrap_version}</span>
            </li>
          )}
          {hugo_version && (
            <li className="d-flex align-items-center justify-content-between">
              <span>Hugo Version</span>
              <span>{hugo_version}</span>
            </li>
          )}
          {theme_version && (
            <li className="d-flex align-items-center justify-content-between">
              <span>Theme Version</span>
              <span>Stable {theme_version}</span>
            </li>
          )}
          {downloadData > 0 && (
            <li className="d-flex align-items-center justify-content-between">
              <span>Total Download</span>
              <span> {downloadData}</span>
            </li>
          )}
          {changelogData.length > 0 && (
            <li className="text-end pb-0" id="themefisher">
              <Changelog
                changelogData={changelogData[0]}
                showChangelog={showChangelog}
              />
            </li>
          )}
          <li className="list-inline-item d-block text-center mt-3">
            <Link
              href={
                documentation
                  ? documentation
                  : `https://docs.themefisher.com/${kebabCase(title)}/`
              }
            >
              <a
                target="_blank"
                rel="noopener"
                className="btn btn-sm btn-outline-primary"
              >
                View Documentation
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeInfo;
