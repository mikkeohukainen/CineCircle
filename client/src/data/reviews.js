import { api } from "./api";

export async function getAllReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

export async function submitReview({ userId, mediaId, rating, reviewText }) {
  const response = await api.post("/reviews", {
    userId,
    mediaId,
    rating,
    reviewText,
  });
  return response.data;
}
