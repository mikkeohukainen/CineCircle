import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Title,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { MovieCard } from "../../components/MovieCard";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function ActorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [actorId, setActorId] = useState(location.state.id);
  const [actorInfo, setActorInfo] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const URL = `http://localhost:8000/search/actor/${actorId}`;
    const data = await fetch(URL);
    const searchResults = await data.json();

    setActorInfo(searchResults);
    const uniqueMovies = deduplicate(searchResults.combined_credits.cast.slice(0, 30))
    setMovies(uniqueMovies);
  };

  const deduplicate = (items) => {
    const uniqueIds = new Set();
    const uniqueItems = [];

    items.forEach((item) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        uniqueItems.push(item);
      }
    });
    return uniqueItems;
  };

  const baseURL = "https://image.tmdb.org/t/p/w300";

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  console.log(movies);

  const movieSlides = movies.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
    </Carousel.Slide>
  ));

  return (
    <Container size="lg" mt="lg">
      <Group justify="space-between">
        <ActionIcon variant="outline" onClick={() => navigate(-1)}>
          <IconArrowLeft></IconArrowLeft>
        </ActionIcon>
      </Group>
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Title ta="center" order={2}>
          {actorInfo.name}
        </Title>

        <Flex gap="lg">
          <Image src={baseURL + actorInfo.profile_path} radius="md"></Image>
          <Container mt="lg">
            <Container mb="lg">
              <Title order={4}>{actorInfo.place_of_birth}</Title>
              <Title order={4}>{actorInfo.birthday}</Title>
            </Container>
            <Text>{actorInfo.biography}</Text>
          </Container>
        </Flex>

        <Title ta="center" c="blue" mt="md" order={2}>
          Known for
        </Title>
        <Carousel
          mt="md"
          slideSize={{ base: "33.333%", sm: "20%" }}
          slideGap={{ base: "md", sm: "xl" }}
          align="start"
          slidesToScroll={mobile ? 3 : 5}
          controlSize={30}
        >
          {movieSlides}
        </Carousel>
      </Card>
    </Container>
  );
}
