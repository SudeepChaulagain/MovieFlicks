import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: getMovieDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center mb-8 lg:mb-16">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-500 mb-4"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1 text-left" />
              Back to Movie List
            </Link>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {data.title}
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              {data.tagline}
            </p>
          </div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 opacity-75">
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                alt={data.title}
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center md:flex-row p-6">
              <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                <img
                  className="w-full h-auto max-w-xs rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                />
              </div>
              <div className="w-full md:w-2/3 mt-6 md:mt-0 md:pl-6">
                <p className="mt-2 mb-4 font-light text-gray-900 dark:text-gray-200 text-left">
                  {data.overview}
                </p>
                <div className="flex items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-300 mr-2">
                    Genres:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-300 mr-2">
                    Release Date:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {data.release_date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-300 mr-2">
                    Rating:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {data.vote_average}/10
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-gray-300 mr-2">
                    Production Companies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.production_companies.map((company, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
