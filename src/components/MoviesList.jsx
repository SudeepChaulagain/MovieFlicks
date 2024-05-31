import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPopularMovies } from "../api/index";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchMovie from "./SearchMovie";

const MoviesList = () => {
  // State for current page and search query
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");

  const queryClient = useQueryClient();

  // Fetch movies data using React Query
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["movies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
    keepPreviousData: true,
  });

  // Prefetch data for next and previous pages
  useEffect(() => {
    if (currentPage < data?.total_pages) {
      queryClient.prefetchQuery({
        queryKey: ["movies", currentPage + 1],
        queryFn: () => getPopularMovies(currentPage + 1),
      });
    }
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: ["movies", currentPage - 1],
        queryFn: () => getPopularMovies(currentPage - 1),
      });
    }
  }, [currentPage, data, queryClient]);

  // Total number of pages
  const totalPages = data?.total_pages;

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter movies based on search query
  const filteredMovies = data.results.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  // Handle header click to reset search and reload movies
  const handleHeaderClick = () => {
    setSearchMovie("");
    setCurrentPage(1);
    refetch();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2
            className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white cursor-pointer"
            onClick={handleHeaderClick}
          >
            MovieFlicks
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of different genres of movies and
            enjoy!!!
          </p>
        </div>

        {/* Search input */}
        <SearchMovie setSearchMovie={setSearchMovie} />

        {/* No movies found message */}
        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500">
            No movies found for {searchMovie} title
          </p>
        )}

        {/* Display filtered movies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          isFetching={isFetching}
        />
      </div>
    </section>
  );
};

export default MoviesList;
