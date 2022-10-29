import React, { useEffect } from "react";
import { useState } from "react";
import "./Pagination.css";

export default function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / dataLimit);
  useEffect(() => {
    setCurrentPage(1);
  }, [totalPages]);

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
    <div>
      <h1>{title}</h1>

      <div className="dataContainer">
        {getPageData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={previousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getViewOfPages().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={nextPage}
          className={`next ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
}
