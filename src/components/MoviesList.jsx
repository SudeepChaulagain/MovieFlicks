import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/index";

const MoviesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    // <div className="bg-gray-900 min-h-screen py-8">
    //   <div className="container mx-auto px-4">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //       {data.map((movie) => (
    //         <div
    //           key={movie.id}
    //           className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    //         >
    //           <img
    //             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //             alt={movie.title}
    //             className="w-full h-56 object-cover"
    //           />
    //           <div className="p-4">
    //             <h2 className="text-xl font-bold text-white">{movie.title}</h2>
    //             <p className="text-gray-400">
    //               {movie.release_date.split("-")[0]}
    //             </p>
    //             <p className="text-gray-300 mt-2">{movie.overview}</p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            MovieFlicks
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Explore the whole collection of different genres of movies and
            enjoy!!!
          </p>
        </div>

        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        {data.map((movie) => (

          <div key={movie.id} className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{movie.title}</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                {movie.release_date.split("-")[0]}
              </span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
              {movie.overview}
              </p>
             
            </div>
          </div>
           ))}
        </div>
      </div>
    </section>
  )
}

export default MoviesList;
