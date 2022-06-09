import Layout from "components/Layouts/Layout";
import Link from "next/link";
import styles from "styles/page-404.module.scss";
const PageNotFound = () => {
  return (
    <Layout title="Page Not Found-Gethugothemes">
      <div className={styles.page404wrapper}>
        <div className={`container ${styles.container}`}>
          <div className={styles.child}>
            <div className={styles.mouth}></div>
            <div className={styles.hand}></div>
          </div>

          <div className={styles.info}>
            <h2>
              Ooh boy! Looks like
              <br />
              Someone is in trouble…
            </h2>
            <p>
              The page you are looking for was moved, removed, renamed or <br />
              might never existed.
            </p>
            <Link href="/">
              <a className={`btn ${styles.btnHome}`}>Go Home</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
