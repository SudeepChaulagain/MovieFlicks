import axios from "axios";

// API key and base URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch popular movies from TMDB API.
 *
 * @param {number} page - The page number of the results to fetch.
 * @returns {Object} An object containing total_pages and results array.
 */

export const getPopularMovies = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });

    return {
      total_pages: response.data.total_pages,
      results: response.data.results,
    };
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
};

/**
 * Fetch details of a specific movie from TMDB API.
 *
 * @param {Array} queryKey - The query key containing ["movie", id].
 * @returns {Object} The movie details.
 */

export const getMovieDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to fetch movie details:", error);
    throw error;
  }
};
