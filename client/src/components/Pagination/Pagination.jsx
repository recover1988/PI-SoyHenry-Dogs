import React from "react";
import { useState } from "react";
import style from "./Pagination.module.css";
/*
data: An array of data that should be shown in the paginated form
RenderComponent: A component that should be used to show the paginated data. In our case, this will the the Post component that we created earlier.
title: This is the title that should describe what the data is about. In our case, it will be the Posts
dataLimit: The number of posts to be shown on each page. In our case, it will be 10.
pageLimit: The number of pages to be shown in the pagination. In our case, it will be 5 pages at a time.
dataLimit -> la cantidad de perros mostrados por pagina
pageLimit -> el numero de paginas que se mostrara en la barra
tittle -> de que se trata los datos
RenderComponent -> sera el DogCard
data -> es todos los datos de dogs
*/

export default function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  return (
    <div className={style.Container}>
      <h1>{title}</h1>
      <div className={style.dataContainer}>
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>

      <div className={style.pagination}>
        <button
          onClick={goToPreviousPage}
          className={` ${style.prev} ${
            currentPage === 1 ? style.disabled : ""
          }`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`${style.paginationItem} ${
              currentPage === item ? style.active : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`${style.next} ${
            currentPage === pages ? style.disabled : ""
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
}
