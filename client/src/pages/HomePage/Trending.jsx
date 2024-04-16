import { MovieCard } from "../../components/MovieCard";
import {
  Container,
  Title,
  useMantineTheme,
  Space,
  rem,
  SegmentedControl,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
export default function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    (async () => {
      await getTrendingMovies();
      await getTrendingTV();
    })();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetch("http://localhost:8000/search/trending/movies");
    const searchResults = await data.json();
    setTrendingMovies(() => searchResults.results);
    console.log("Trending movies fetched");
  };

  const getTrendingTV = async () => {
    const data = await fetch("http://localhost:8000/search/trending/tv");
    const searchResults = await data.json();
    setTrendingTVShows(() => searchResults.results);
    console.log("Trending TVshows fetched");
  };

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const movieSlides = trendingMovies.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
    </Carousel.Slide>
  ));
  const TVSlides = trendingTVShows.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Group mt="xl" mb="lg">
        <Title order={2}>Trending</Title>
        <SegmentedControl
          value={mediaType}
          onChange={setMediaType}
          data={[
            { label: "Movies", value: "movie" },
            { label: "TV shows", value: "tv" },
          ]}
          color="blue"
          size="md"
          radius="md"
          transitionDuration={300}
        />
      </Group>
      <Carousel
        slideSize={{ base: "33.333%", sm: "20%" }}
        slideGap={{ base: "md", sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 3 : 5}
        controlSize={30}
      >
        {mediaType === "movie" ? movieSlides : TVSlides}
      </Carousel>
      <Space h="xl" />
    </>
  );
}
