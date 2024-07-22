import React from 'react';
import { Link } from 'gatsby';
import { PAGINATION } from '../constants';

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasPrevPage,
  hasNextPage,
  isFirstPage,
  isLastPage,
  totalPages
}) => {
  if (totalPages === 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <div className={'pagination'}>
      <div className={'pagination__prev'}>
        {!isFirstPage && hasPrevPage && (
          <Link 
            rel="prev" 
            to={prevPagePath} 
            className="pagination__prev-link"
          >
            {PAGINATION.PREV_PAGE}
          </Link>
        )}
      </div>
      <div className={'pagination__next'}>
        {!isLastPage && hasNextPage && (
          <Link 
            rel="next" 
            to={nextPagePath} 
            className="pagination__next-link"
          >
            {PAGINATION.NEXT_PAGE}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;