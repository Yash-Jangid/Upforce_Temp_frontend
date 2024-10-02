import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-end items-center my-4">
            <button 
                className="bg-transparent border border-gray-300 rounded w-10 h-10 flex justify-center items-center transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                <ArrowBackIosIcon className="text-gray-700" />
            </button>
            <span className="mx-4 px-4 py-2 rounded bg-red-600 text-white text-lg min-w-[40px] text-center">
                {currentPage}
            </span>
            <button 
                className="bg-transparent border border-gray-300 rounded w-10 h-10 flex justify-center items-center transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <ArrowForwardIosIcon className="text-gray-700" />
            </button>
        </div>
    );
};

export default PaginationComponent;
