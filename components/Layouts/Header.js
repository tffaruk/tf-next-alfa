import Search from "components/Search";
import config from "config/config.json";
import menu from "config/menu.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import common from "styles/common.module.scss";
import styles from "styles/header.module.scss";
import Mobilemenu from "./Mobilemenu";

const Header = ({ toggle, isOpen, blogProgressEL }) => {
  const { logo, site_url } = config.parameter;
  const { main } = menu;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const [os, setOs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOs(navigator.platform.indexOf("Mac") > -1);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModalIsOpen(false);
      } else if (os && e.metaKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      }
    });
    if (os) {
      setKey("⌘K");
    } else {
      setKey("Ctrl K");
    }
  }, [modalIsOpen, os]);
  return (
    <>
      <header>
        <div className={styles.headerNavigation}>
          <div className={`${common.container} container position-relative`}>
            <div className="row">
              <div className="col-md-12">
                <nav
                  className={`navbar navbar-expand-lg navbar-light bg-transparent ${styles.navbar}`}
                >
                  <Link href="/">
                    <a
                      className={`navbar-brand d-inline-flex ${styles.logo} ${styles.navbarBrand} pb-0`}
                    >
                      <Image
                        className="image-fluid"
                        src={`${logo}`}
                        alt="logo"
                        width="360"
                        height="80"
                        loading="eager"
                        priority
                      />
                    </a>
                  </Link>
                  <div className="navbar-action">
                    <button
                      className={`${styles.searchToggler} d-inline-block d-lg-none lh-1`}
                      type="button"
                      data-toggle="search-toggler"
                      title="Search"
                      onClick={() => setModalIsOpen(!modalIsOpen)}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted"
                        aria-hidden="true"
                      >
                        <path d="m19 19-3.5-3.5"></path>
                        <circle cx="11" cy="11" r="6"></circle>
                      </svg>
                    </button>
                    <button
                      className={`${styles.navbarToggler} navbar-toggler shadow-none border`}
                      type="button"
                      data-toggle="mobile-menu"
                      title="Menu"
                      onClick={toggle}
                    >
                      <span
                        className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}
                      ></span>
                    </button>
                  </div>
                  <div
                    className="collapse navbar-collapse text-center text-xl-right"
                    id="navbarSupportedContent"
                  >
                    <div className="mx-auto text-center">
                      <div className={`${styles.menuMainMenuContainer}`}>
                        <ul
                          id="primary-menu"
                          className={`navbar-nav ml-auto ${styles.headerMenu} ${styles.mainMenu} d-inline-block`}
                        >
                          {main.map((menu, i) => (
                            <li
                              key={`main-${i}`}
                              className={` ${styles.menuItem} ${
                                router.asPath == menu.url ? styles.active : null
                              } ${
                                menu.child ? styles.menuItemHasChildren : ""
                              }`}
                            >
                              <Link href={menu.url}>
                                <a rel={menu.rel}>{menu.name}</a>
                              </Link>
                              {menu.child && (
                                <ul className={styles.subMenu}>
                                  {menu.child.map((child, i) => (
                                    <li
                                      key={`child-${i}`}
                                      className={`${styles.menuItem} ${
                                        router.asPath == `${child.url}`
                                          ? styles.active
                                          : ""
                                      }`}
                                    >
                                      <Link href={`${child.url}`}>
                                        <a
                                          rel={child.rel}
                                          className="text-capitalize"
                                        >
                                          {child.name}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      className={`form-inline ${styles.headerSearchBlock} ${
                        os ? styles.macOS : ""
                      }`}
                      datatext={key}
                    >
                      <button
                        className={styles.searchBtn}
                        title="Search"
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted"
                          aria-hidden="true"
                        >
                          <path d="m19 19-3.5-3.5"></path>
                          <circle cx="11" cy="11" r="6"></circle>
                        </svg>
                      </button>
                      <input
                        type="search"
                        placeholder="Search theme"
                        name="s"
                        title="Search for:"
                        required
                        readOnly
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {blogProgressEL && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} id="progressBar"></div>
            </div>
          )}
        </div>

        <div
          className={`${styles.mobileMenuToggleOverlay} ${
            isOpen ? styles.mobileMenuToggleOverlayShow : ""
          }`}
          data-toggle="mobile-menu-close"
          onClick={toggle}
        ></div>

        <div className={styles.headerHeightFix}></div>
        <Mobilemenu toggle={toggle} isOpen={isOpen} />
      </header>

      <Search modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default Header;
