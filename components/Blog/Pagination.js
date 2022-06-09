import Link from "next/link";
import common from "styles/common.module.scss";

const Pagination = ({ page, numOfPage }) => {
  const hasPrevPage = page > 1;
  const hasNextPage = numOfPage > page;
  let pageList = [];
  for (let i = 1; i <= numOfPage; i++) {
    pageList.push(i);
  }
  return (
    <div className={`${common.pagination} mt-5 pt-4`}>
      <nav aria-label="Posts navigation">
        <ul className="page-numbers">
          {hasPrevPage && (
            <li>
              <Link href={`/blog/page/${page - 1}`}>
                <a className={common.prev}> Prev</a>
              </Link>
            </li>
          )}
          {pageList.map((pagenumber, i) => (
            <li key={`page-${i}`}>
              <Link href={`/blog/page/${pagenumber}`}>
                <a className={page == pagenumber ? common.active : ""}>
                  {pagenumber}
                </a>
              </Link>
            </li>
          ))}

          {hasNextPage && (
            <li>
              <Link href={`/blog/page/${page + 1}`}>
                <a className={common.next}>Next</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
