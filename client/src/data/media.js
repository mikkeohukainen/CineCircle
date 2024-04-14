import { api } from "./api";

export const getMovieDetails = async (id) => {
  const response = await api.get(`/search/movie/details/${id}`);
  return response.data;
};

export const getTvDetails = async (id) => {
  const response = await api.get(`/search/tv/details/${id}`);
  return response.data;
};
