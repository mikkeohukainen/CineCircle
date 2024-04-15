import { getAllReviews } from "../../data/reviews";
import { useEffect, useState } from "react";
import { ReviewCard } from "../../components/ReviewCard";
import { Container, Group, Stack, Title } from "@mantine/core";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const reviews = await getAllReviews();
      setReviews(reviews);
    })();
  }, []);

  return (
    <Container
      size={{
        sm: "lg",
        md: "lg",
      }}
      mt="lg"
    >
      <Group position="center" justify="space-between" pb={20}>
        <Title>Reviews</Title>
      </Group>
      <Stack gap="sm">
        {reviews.map((review) => (
          <ReviewCard key={review.review_id} review={review} />
        ))}
      </Stack>
    </Container>
  );
}
