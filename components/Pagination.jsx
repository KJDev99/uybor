import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ totalAds, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalAds / 10);

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages];
    } else if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, "...", currentPage, "...", totalPages];
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 flex flex-col items-center justify-center h-8 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <FaAngleLeft />
      </button>
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            className={`w-8 flex flex-col items-center justify-center h-8 rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 flex flex-col items-center justify-center h-8 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
