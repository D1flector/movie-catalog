import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import '../styles/Pagination.scss'

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isClickBlocked: boolean;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 2,
}) => {
  const {
    paginationRange,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({ totalPages, currentPage, onPageChange, siblingCount });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${isFirstPage ? 'disabled' : ''}`}
        onClick={handlePreviousPage}
      >
        <div className="arrow left" />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={DOTS + index} className="pagination-item dots">...</li>;
        }

        return (
          <li
            key={pageNumber}
            className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={`pagination-item ${isLastPage ? 'disabled' : ''}`}
        onClick={handleNextPage}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;