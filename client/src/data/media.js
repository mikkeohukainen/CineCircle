import { api } from "./api";

export const getMovieDetails = async (id) => {
  const response = await api.get(`/search/movie/details/${id}`);
  return response.data;
};

export const getTvDetails = async (id) => {
  const response = await api.get(`/search/tv/details/${id}`);
  return response.data;
};

export const getTrending = async (type) => {
  const response = await api.get("/search/trending/" + type);
  return response.data.results;
};

export const getRecommended = async (type, id) => {
  const response = await api.get(`/search/recommendations?type=${type}&id=${id}`);
  return response.data.results;
};

export const searchMedia = async (query) => {
  const response = await api.get("/search/multi/title/" + query);
  return response.data;
};

export const searchWithFilters = async (
  type,
  page,
  genreID,
  providerID,
  actorID,
  directorID,
  tvType,
  tvStatus,
) => {
  let URL = `/search/multi/filter?a=10&page=${page}&type=${type}`;

  if (genreID && genreID !== 0) URL += `&genre=${genreID}`;
  if (providerID && providerID !== 0) URL += `&provider=${providerID}`;
  if (actorID && actorID !== 0) URL += `&actor=${actorID}`;
  if (directorID && directorID !== 0) URL += `&director=${directorID}`;
  if (tvType) URL += `&tvtype=${tvType}`;
  if (tvStatus) URL += `&tvstatus=${tvStatus}`;

  const response = await api.get(URL);
  return response.data;
};

export const getGenres = async (type) => {
  const response = await api.get("/search/genres/" + type);
  return response.data.genres;
};

export const getProviders = async (type) => {
  const response = await api.get("/search/providers/" + type);
  return response.data;
};

export const searchPeople = async (query) => {
  const response = await api.get("/search/people/name/" + query);
  return response.data;
};

export const getActorDetails = async (id) => {
  const response = await api.get(`/search/actor/${id}`);
  return response.data;
};

export const getImages = async (type, id) => {
  const response = await api.get(`/search/${type}/images/${id}`);
  const limitedImages = response.data.backdrops.slice(1, 11);
  return limitedImages;
};
