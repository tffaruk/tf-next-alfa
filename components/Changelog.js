/* eslint-disable react/no-unescaped-entities */
import { marked } from "marked";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import common from "styles/common.module.scss";
import styles from "styles/singleDownload.module.scss";

const Changelog = ({
  changelogData: { content, frontmatter },
  showChangelog,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (showChangelog) {
      setOpen(true);
    }
  }, [showChangelog]);

  return (
    <div className={styles.changelogContainer}>
      <div
        className="d-flex justify-content-between"
        style={{ marginBottom: 10 + "px" }}
      >
        <span>Changelog</span>
        <span
          onClick={() => setOpen(!open)}
          aria-controls="changelog"
          aria-expanded={open}
          className={`${common.textPrimary} ${common.fontSemiBold}`}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {open ? "Hide" : "Show"}
        </span>
      </div>

      <Collapse in={open}>
        <div className={styles.changelog} id="changelog">
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </div>
      </Collapse>
    </div>
  );
};

export default Changelog;
