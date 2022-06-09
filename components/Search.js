import { sortByWeight } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import common from "styles/common.module.scss";
import styles from "styles/search.module.scss";
import { useAppContext } from "../context/state";
import SearchResults from "./SearchResults";

const Search = ({ setModalIsOpen, modalIsOpen }) => {
  const { products } = useAppContext();
  const [searchData, setSearchData] = useState();
  const [allData, setAllData] = useState([]);
  const emailInputRef = useRef(null);

  useEffect(() => {
    setAllData(products);
    modalIsOpen
      ? emailInputRef.current.focus()
      : (emailInputRef.current.value = ""),
      setSearchData("");
  }, [modalIsOpen, setSearchData, products]);
  // product for default
  const filterByWeight = allData.filter(
    (product) => product.frontmatter.weight > 0
  );
  const productsByWeight = sortByWeight(filterByWeight);
  // search filtering
  let searchItem = allData.filter((product) => {
    if (searchData === "") {
      return "";
    } else if (
      product.frontmatter.title.toLowerCase().includes(searchData) ||
      product.frontmatter.title.toUpperCase().includes(searchData) ||
      product.frontmatter.title.includes(searchData)
    ) {
      return product;
    } else if (product.categories.find((c) => c.includes(searchData))) {
      return product;
    } else if (
      product.frontmatter.keywords.find((c) => c.includes(searchData))
    ) {
      return product;
    }
  });

  return (
    <div
      className={`${styles.searchContainer} ${
        modalIsOpen ? `d-block` : "d-none"
      }`}
    >
      <div
        className={styles.searchToggle}
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className={`overflow-hidden ${styles.searchBox}`}>
        <div className="input-group p-2 border-bottom">
          <span
            className="input-group-text bg-transparent border-0 pe-0"
            id="basic-addon1"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </span>
          <input
            className={`form-control border-0 outline-0 shadow-none ${styles.formControl}`}
            defaultValue=""
            type="text"
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search theme"
            ref={emailInputRef}
          />
          <span
            className={`align-self-center small ms-0 lh-0 font-monospace ${styles.fontMedium} ${styles.searchClose}`}
            onClick={() => setModalIsOpen(false)}
          >
            <span className="d-none d-sm-block">ESC</span>
            <span className="d-block d-sm-none lh-base">&#x2715;</span>
          </span>
        </div>
        <div className={`pt-4 ${styles.searchResultWrap}`}>
          {searchData != "" && !searchItem.length && (
            <p
              className={`mx-3 text-muted mt-md-4 mb-md-5 mt-2 mb-4 lh-1 text-center ${common.fontRegular}`}
              style={{ fontSize: 28 + "px" }}
            >
              No results for
              <span className={`${common.textPrimary}`}>
                {" "}
                {`"${searchData}"`}
              </span>
            </p>
          )}

          {searchData != "" && searchItem.length > 0 && (
            <p
              className={`mx-3 text-muted mb-4 ${common.fontRegular}`}
              style={{ fontSize: 24 + "px" }}
            >
              Results for
              <span
                className={`${common.textPrimary}`}
              >{` "${searchData}"`}</span>
            </p>
          )}

          {!searchItem.length && (
            <p className="h4 text-dark mx-3 mb-4">
              {searchData != "" && <span>Try our </span>}
              Most popular templates
            </p>
          )}

          <SearchResults
            products={searchItem}
            defaultData={productsByWeight.slice(0, 4)}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
