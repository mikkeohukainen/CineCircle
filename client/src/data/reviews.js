import { api } from "./api";

export async function getAllReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

export async function getReviews(tmdbId) {
  const response = await api.get(`/reviews/media/${tmdbId}`);
  return response.data;
}

export async function submitReview(review) {
  const response = await api.post("/reviews", {
    ...review,
  });
  return response.data;
}
