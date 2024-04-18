import { api } from "./api";

export async function getFavorites(username) {
  const response = await api.get(`/users/${username}/favorites`);
  return response.data;
}

export async function getFavoritesByListId(listId) {
  const response = await api.get(`/users/favorites/${listId}`);
  return response.data;
}

export async function addFavorite(username, title, type, description, tmdbId, posterUrl) {
  return api.post(`/users/${username}/favorites`, {
    username,
    title,
    type,
    description,
    tmdbId,
    posterUrl,
  });
}

export async function removeFavorite(username, tmdbId) {
  return api.delete(`/users/${username}/favorites`, {
    data: { tmdbId },
  });
}
