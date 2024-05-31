import PropTypes from "prop-types";
/**
 * Pagination component for navigating between pages.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {function} handlePrevPage - Function to handle clicking on the previous page button.
 * @param {function} handleNextPage - Function to handle clicking on the next page button.
 * @param {boolean} isFetching - Flag indicating if data is currently being fetched.
 */
const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  isFetching,
}) => {
  return (
    <div className="flex justify-center mt-8">
      {/* Previous page button */}
      <button
        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handlePrevPage}
        disabled={currentPage === 1 || isFetching}
      >
        Previous
      </button>

      {/* Next page button */}
      <button
        className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleNextPage}
        disabled={currentPage === totalPages || isFetching}
      >
        Next
      </button>
    </div>
  );
};

// Prop types validation
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Pagination;
