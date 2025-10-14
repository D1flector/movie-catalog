import { useCallback } from 'react';

export interface UsePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface UsePaginationReturn {
  finalTotalPages: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export const usePagination = ({ totalPages, currentPage, onPageChange }: UsePaginationProps): UsePaginationReturn => {
  const finalTotalPages = totalPages > 500 ? 500 : totalPages;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= finalTotalPages;

  const handleNextPage = useCallback(() => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, isLastPage, onPageChange]);

  const handlePreviousPage = useCallback(() => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, isFirstPage, onPageChange]);

  return {
    finalTotalPages,
    currentPage,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handlePreviousPage,
  };
};