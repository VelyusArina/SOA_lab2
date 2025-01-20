import React from 'react';

const Pagination = ({ page, totalPages, handlePrevPage, handleNextPage, handlePageClick }) => {
    return (
        <div>
            <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
            {/* Отображение кнопок для каждой страницы */}
            {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                    key={pageNumber + 1}
                    onClick={() => handlePageClick(pageNumber + 1)}
                    className={page === pageNumber + 1 ? 'active' : ''}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button onClick={handleNextPage} disabled={page >= totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
