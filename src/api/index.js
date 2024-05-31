import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });

    // Directly return the results with pagination info
    return {
      total_pages: response.data.total_pages,
      results: response.data.results,
    };
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    throw error;
  }
};

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
