import axios from "axios"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    const moviesWithImages = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const detailedResponse = await axios.get(
            `${BASE_URL}/movie/${movie.id}`,
            {
              params: {
                api_key: API_KEY,
                append_to_response: "images", // Request images
              },
            }
          );
          return {
            ...movie,
            images: detailedResponse.data.images,
          }
        } catch (error) {
          console.error(
            `Failed to fetch detailed movie information for ID ${movie.id}:`,
            error
          )
          // Return the movie without images if detailed information cannot be fetched
          return movie;
        }
      })
    );

    return moviesWithImages;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
};
