import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router-dom";
import CastCarousel from "./CastCarousel.jsx";

export default function MediaDetailsPage() {
  const location = useLocation();
  const [mediaObj, setMediaObj] = useState(location.state.obj);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getImages();
      getCredits();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getImages = async () => {
    // const URL = `http://localhost:8000/search/${mediaObj.media_type}/images/${mediaObj.id}`;
    // const data = await fetch("http://localhost:8000/search/movie/images/" + mediaObj.id);
    const URL = `http://localhost:8000/search/${mediaObj.title ? 'movie' : 'tv'}/images/${mediaObj.id}`;
    const data = await fetch(URL);
    const searchResults = await data.json();
    const limitedImages = searchResults.backdrops.slice(0, 20);
    setImages(() => limitedImages);
    console.log("Fetching images from: " + URL);
  };

  const getCredits = async () => {
    setIsLoading(true);
    const URL = `http://localhost:8000/search/${mediaObj.title ? 'movie' : 'tv'}/credits/${mediaObj.id}`;
    // const data = await fetch("http://localhost:8000/search/movie/images/" + mediaObj.id);
    const data = await fetch(URL);
    const searchResults = await data.json();
    setCredits(() => searchResults);
    setIsLoading(false);
    console.log("Credits fetched");
  };

  const baseURL = "https://image.tmdb.org/t/p/original";

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const imageSlides = images.map((image) => (
    <Carousel.Slide key={image.file_path}>
      <Image src={baseURL + image.file_path}></Image>
    </Carousel.Slide>
  ));

  return (
    <Container size="lg" mt="lg">
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Carousel
            slideSize={{ base: "100%", sm: "100%" }}
            slideGap={{ base: "md", sm: "xl" }}
            align="start"
            slidesToScroll={mobile ? 1 : 1}
            controlSize={30}
          >
            {imageSlides}
          </Carousel>
        </Card.Section>

        <Title ta="center" mt="md" order={1}>
          {mediaObj.title || mediaObj.name}
        </Title>
        <Text ta="center" size="xl" mt="md">
          {mediaObj.overview}
        </Text>
        <Container>
          <Badge variant="light" color="blue" size="xl" radius="md" mt="md">
            {"Release date: " + (mediaObj.release_date || mediaObj.first_air_date)}
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

        <Title ta="center" c="blue" mt="md" order={2}>
          Cast
        </Title>

        {!isLoading && credits.cast && <CastCarousel creditsArray={credits} />}

        <Button color="blue" mt="md" radius="md" fullWidth>
          Add to favorites
        </Button>
      </Card>
    </Container>
  );
}
