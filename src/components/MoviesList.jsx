import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPopularMovies } from "../api/index";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const MoviesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["movies", currentPage],
    queryFn: () => getPopularMovies(currentPage),
    keepPreviousData: true,
  });

  const [searchMovie, setSearchMovie] = useState("");

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredMovies = data.results.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const totalPages = data.total_pages;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            MovieFlicks
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of different genres of movies and enjoy!!!
          </p>
        </div>
        <div className="flex justify-end mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3" />
          </div>
        </div>
        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500">No movies found for "{searchMovie}"</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <div key={movie.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden group dark:bg-gray-800 dark:text-white">
                <img
                  className="w-full h-62 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
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
                  <a
                    href="#"
                    className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10 "
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isFetching}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isFetching}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
