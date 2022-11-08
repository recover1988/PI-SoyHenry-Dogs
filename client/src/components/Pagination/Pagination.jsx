import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / dataLimit);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages, data]);

  function nextPage() {
    setCurrentPage((page) => page + 1);
  }

  function previousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    let index = Number(event.target.value);
    setCurrentPage(index);
  }

  function getPageData() {
    const end = dataLimit * currentPage;
    const start = end - dataLimit;
    return data.slice(start, end);
  }
  function getViewOfPages() {
    let pages = new Array(totalPages).fill().map((_, index) => index + 1);
    let start = currentPage - 1;
    let end = currentPage - 1 + pageLimit;
    return pages.slice(start, end);
  }
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          onClick={previousPage}
          className={`${styles.prev} ${
            currentPage === 1 ? `${styles.disabled}` : ""
          }`}
        >
          prev
        </button>

        {getViewOfPages().map((item, index) => (
          <button
            key={index}
            value={item}
            onClick={changePage}
            className={`${styles.paginationItem} ${
              currentPage === item ? `${styles.active}` : null
            }`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={nextPage}
          className={`${styles.next} ${
            currentPage >= totalPages ? `${styles.disabled}` : ""
          }`}
        >
          next
        </button>
      </div>
      <div className={styles.dataContainer}>
        {getPageData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>
    </div>
  );
}
