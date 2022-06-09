import config from "config/config.json";
import menu from "config/menu.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "styles/header.module.scss";

const Mobilemenu = ({ toggle, isOpen }) => {
  const { main } = menu;
  const router = useRouter();
  const [isDropDown, setDropDown] = useState(false);

  return (
    <>
      <div className={`${styles.mobileMenu} ${isOpen ? styles.show : ""} `}>
        <div className="d-flex align-items-center justify-content-between">
          <Link href="/">
            <a className={`navbar-brand ${styles.navbarBrand} ${styles.logo}`}>
              <Image
                src={`${config.parameter.logo}`}
                alt="logo"
                width="160"
                height="50"
                loading="eager"
              />
            </a>
          </Link>
          <svg
            data-toggle="mobile-menu-close"
            onClick={toggle}
            className={styles.mobileMenuClose}
            datatoggle="mobile-menu"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
          </svg>
        </div>
        <div className={styles.menuMainMenuContainer}>
          <ul id="primary-menu" className="list-unstyled mb-0 mt-2">
            {main.map((menu, i) => (
              <li
                key={`main-${i}`}
                className={` ${styles.menuItem} ${
                  menu.child ? styles.menuItemHasChildren : ""
                }`}
                onClick={() => menu.child && setDropDown(!isDropDown)}
              >
                <Link href={menu.url}>
                  <a rel={menu.rel}>{menu.name}</a>
                </Link>
                {menu.child && (
                  <ul
                    className={`${styles.subMenu} ${
                      isDropDown == true ? styles.show : ""
                    }`}
                  >
                    {menu.child.map((child, i) => (
                      <li
                        key={`child-${i}`}
                        className={`${styles.menuItem} ${
                          router.asPath == `${child.url}` ? styles.active : ""
                        }`}
                      >
                        <Link href={`${child.url}`}>
                          <a rel={child.rel} className="text-capitalize">
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
    </>
  );
};

export default Mobilemenu;
