import React from 'react';
import { usePagination } from '../hooks/usePagination';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isClickBlocked: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, isLoading, isClickBlocked }) => {

  const {
    finalTotalPages,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({ totalPages, currentPage, onPageChange });

  if (finalTotalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={handlePreviousPage}
        disabled={isFirstPage || isLoading || isClickBlocked}
        className="pagination__button"
      >
        Назад
      </button>

      <span className="pagination__info">
        Страница {currentPage} из {finalTotalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={isLastPage || isLoading || isClickBlocked}
        className="pagination__button"
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;