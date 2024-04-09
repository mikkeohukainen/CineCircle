import { api } from "./api";

export async function getFavorites(username) {
  return api.get(`/users/${username}/favorites`);
}

export async function addFavorite(username, title, type, description, tmdbId, posterUrl) {
  return api.post(`/users/${username}/favorites`, {
    username,
    title,
    type,
    description,
    tmdbId,
    posterUrl
  });
}
