import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * MovieCard component for displaying movie information.
 *
 * @param {Object} movie - The movie object containing details like id, title, poster_path, release_date, and overview.
 */

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group dark:bg-gray-800 dark:text-white">
      {/* Link to movie details page */}
      <Link to={`/movie/${movie.id}`}>
        <img
          className="w-full h-62 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold tracking-tight">
            <a href="#">{movie.title}</a>
          </h3>
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {movie.release_date.split("-")[0]}
          </span>
        </div>
        <p className="mt-3 mb-4 font-light text-gray-900 dark:text-gray-300 text-left text-wrap">
          {movie.overview}
        </p>

        {/* Link to movie details page */}
        <Link
          to={`/movie/${movie.id}`}
          className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10 "
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

// Prop types validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
