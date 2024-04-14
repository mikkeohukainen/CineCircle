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
  ActionIcon,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import CastCarousel from "./CastCarousel.jsx";
import AddMediaToGroup from "./AddMediaToGroupButton.jsx";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo.js";
import { getFavorites, addFavorite } from "../../data/favorites";

export default function MediaDetailsPage() {
  const { username, userId, isLoggedIn } = useAuth();
  const { favorites, setFavorites } = useUserInfo();

  const location = useLocation();
  const navigate = useNavigate();

  const [mediaObj, setMediaObj] = useState(location.state.obj);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    getImages();
    getCredits();
    getGenres();
    fetchFavorites();
  }, []);

  useEffect(() => {
    checkFavorites();
  }, [favorites]);

  const fetchFavorites = async () => {
    if (isLoggedIn && username) {
      console.log("Trying to fetch favorites.");
      try {
        const results = await getFavorites(username);
        const searchResults = results.data;
        setFavorites(searchResults);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkFavorites = () => {
    if (isLoggedIn && favorites) {
      console.log("Checking favorites.");
      console.log(favorites);
      const idFound = favorites.some((favorite) => favorite.tmdb_id === mediaObj.id);
      if (idFound) {
        console.log("Movie ID found in favorites.");
        setInFavorites(true);
      } else {
        console.log("Movie ID NOT found in favorites.");
        setInFavorites(false);
      }
    }
  };

  const addToFavorites = async () => {
    const type = mediaObj.title ? "movie" : "series";
    try {
      await addFavorite(
        username,
        mediaObj.title || mediaObj.name,
        type,
        mediaObj.overview,
        mediaObj.id,
        mediaObj.poster_path,
      );
    } catch (error) {
      console.error(error);
    }
    fetchFavorites();
  };

  const getImages = async () => {
    const URL = `http://localhost:8000/search/${mediaObj.title ? "movie" : "tv"}/images/${mediaObj.id}`;
    const data = await fetch(URL);
    const searchResults = await data.json();
    const limitedImages = searchResults.backdrops.slice(0, 20);
    setImages(() => limitedImages);
  };

  const getCredits = async () => {
    setIsLoading(true);
    const URL = `http://localhost:8000/search/${mediaObj.title ? "movie" : "tv"}/credits/${mediaObj.id}`;
    const data = await fetch(URL);
    const searchResults = await data.json();
    setCredits(() => searchResults);
    setIsLoading(false);
  };

  const getGenres = async () => {
    const URL = `http://localhost:8000/search/genres/${mediaObj.title ? "movie" : "tv"}`;
    const data = await fetch(URL);
    const searchResults = await data.json();
    const currentObjGenres = new Set(mediaObj.genre_ids);
    const filteredGenres = searchResults.genres.filter((genre) => currentObjGenres.has(genre.id));
    setGenres(() => filteredGenres);
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
      <Group justify="space-between">
        <ActionIcon variant="outline" onClick={() => navigate(-1)}>
          <IconArrowLeft></IconArrowLeft>
        </ActionIcon>
        <AddMediaToGroup mediaObj={mediaObj} />
      </Group>
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
        </Container>
        <Group justify="center">
          {genres.map((genre) => (
            <Badge key={genre.id} color="gray" size="xl" radius="md" mt="md">
              {genre.name}
            </Badge>
          ))}
        </Group>
        <Title ta="center" c="blue" mt="md" order={2}>
          Cast
        </Title>

        {!isLoading && credits.cast && <CastCarousel creditsArray={credits} />}

        {isLoggedIn && !inFavorites && (
          <Button color="blue" mt="md" radius="md" fullWidth onClick={addToFavorites}>
            Add to favorites
          </Button>
        )}

        {isLoggedIn && inFavorites && (
          <Container>
            <Badge variant="outline" color="blue" size="xl" radius="md" mt="md">
              Already in your favorites list
            </Badge>
          </Container>
        )}

        {!isLoggedIn && (
          <Container>
            <Badge variant="outline" color="blue" size="xl" radius="md" mt="md">
              Log in to add to favorites
            </Badge>
          </Container>
        )}

        {/* <Button color="blue" mt="md" radius="md" fullWidth>
          Add to favorites
        </Button> */}
      </Card>
    </Container>
  );
}
