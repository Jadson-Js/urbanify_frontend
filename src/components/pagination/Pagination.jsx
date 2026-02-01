import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import style from "./style.module.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const maxVisiblePages = 5;

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={style.pagination}>
      <GrFormPrevious
        className={`${style.box} ${style.prev} ${currentPage === 1 ? style.disabled : ""}`}
        onClick={() => changePage(currentPage - 1)}
      />

      {currentPage > 3 && totalPages > maxVisiblePages && (
        <>
          <button
            className={`font-s ${style.box}`}
            onClick={() => changePage(1)}
          >
            1
          </button>
          {currentPage > 4 && (
            <span className={`font-s ${style.box} ${style.disabled}`}>...</span>
          )}
        </>
      )}

      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`font-s ${style.box} ${page === currentPage ? style.select : ""}`}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > maxVisiblePages && (
        <>
          {currentPage < totalPages - 3 && (
            <span className={`font-s ${style.box} ${style.disabled}`}>...</span>
          )}
          <button
            className={`font-s ${style.box}`}
            onClick={() => changePage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <GrFormNext
        className={`${style.box} ${style.next} ${currentPage === totalPages ? style.disabled : ""}`}
        onClick={() => changePage(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
