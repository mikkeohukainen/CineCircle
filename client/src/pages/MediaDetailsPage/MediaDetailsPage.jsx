import React, { useState } from "react";
import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { useLocation } from "react-router-dom";

export default function MediaDetailsPage() {
  const location = useLocation();
  const [movieObj, setMovieObj] = useState(location.state.obj);

  const baseURL = "https://image.tmdb.org/t/p/original";

  return (
    <Container size="lg" mt="lg">
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={baseURL + movieObj.backdrop_path}
            //   height={160}
            alt="Norway"
          />
        </Card.Section>

        <Title ta="center" mt="md" order={1}>{movieObj.title || movieObj.name}</Title>
        <Text ta="center" size="xl" mt="md">{movieObj.overview}</Text>
        <Container>
            <Badge variant="light" color="blue" size="xl" radius="md" mt="md">
                {"Release date: " + movieObj.release_date}
            </Badge>
            <Group mt="md" mb="xs">
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
            </Group>
        </Container>
        <Title ta="center" c="blue" mt="md" order={2}>Cast</Title>

        <Button color="blue" mt="md" radius="md" fullWidth>
          Add to favorites
        </Button>
      </Card>
    </Container>
  );
}
