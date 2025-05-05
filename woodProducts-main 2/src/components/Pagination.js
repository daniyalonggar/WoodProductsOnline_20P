import React from 'react';

const Pagination = ({currentPage, itemsPerPage, productsLen}) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div
            className="flex flex-col pt-8 text-base font-bold tracking-wider leading-snug text-center uppercase text-neutral-700">
            <div className="flex justify-center gap-4">
                <button
                    aria-label="Previous page"
                    className="px-4 py-2 border border-solid border-neutral-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <button
                    aria-label="Next page"
                    className="px-4 py-2 border border-solid border-neutral-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * itemsPerPage >= productsLen}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default Pagination;