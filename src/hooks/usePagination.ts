import { useMemo } from 'react';

export interface UsePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const DOTS = '...';
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};


export const usePagination = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: UsePaginationProps) => {

  const paginationRange = useMemo(() => {
    const finalTotalPages = totalPages > 500 ? 500 : totalPages;

    // Количество элементов, которые мы хотим отобразить:
    // 1 (первая стр) + 1 (последняя стр) + 1 (текущая стр) + siblingCount * 2 (соседи) + 2 (многоточия)
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= finalTotalPages) {
      return range(1, finalTotalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, finalTotalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < finalTotalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = finalTotalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Формула `3 + 2 * siblingCount` расшифровывается так:
      //   + `2 * siblingCount`: количество "соседей" слева и справа.
      //   + `3`: три "опорных" элемента - сама `currentPage`, `firstPage` (1)      
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, finalTotalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(finalTotalPages - rightItemCount + 1, finalTotalPages);
      
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalPages, siblingCount, currentPage]);


  const finalTotalPages = totalPages > 500 ? 500 : totalPages;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= finalTotalPages;

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return {
    paginationRange,
    currentPage,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handlePreviousPage,
    onPageChange,
  };
};