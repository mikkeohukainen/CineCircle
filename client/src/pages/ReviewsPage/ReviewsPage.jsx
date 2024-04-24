import { getAllReviews } from "../../data/reviews";
import { useEffect, useState } from "react";
import { ReviewCard } from "../../components/ReviewCard";
import { Container, Group, Stack, Title, Skeleton } from "@mantine/core";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const reviews = await getAllReviews();
      setReviews(reviews);
      setLoading(false);
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
        {loading
          ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} height={185} />)
          : reviews.map((review) => <ReviewCard key={review.review_id} review={review} />)}
      </Stack>
    </Container>
  );
}
