import { MovieCard } from "../../components/MovieCard";
import { Container, useMantineTheme, Space, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [TVShows, setTVShows] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTrendingMovies();
      getTrendingTV();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetch("http://localhost:8000/search/trending/movies");
    const searchResults = await data.json();
    setMovies(() => searchResults.results);
    console.log("Trending movies fetched");
  };

  const getTrendingTV = async () => {
    const data = await fetch("http://localhost:8000/search/trending/tv");
    const searchResults = await data.json();
    setTVShows(() => searchResults.results);
    console.log("Trending TVshows fetched");
  };

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const movieSlides = movies.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
    </Carousel.Slide>
  ));
  const TVSlides = TVShows.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <h2>Trending movies</h2>
      <Carousel
        slideSize={{ base: "33.333%", sm: "20%" }}
        slideGap={{ base: "md", sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 3 : 5}
        controlSize={30}
      >
        {movieSlides}
      </Carousel>

      <h2>Trending TV shows</h2>
      <Carousel
        slideSize={{ base: "33.333%", sm: "20%" }}
        slideGap={{ base: "md", sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 3 : 5}
        controlSize={30}
      >
        {TVSlides}
      </Carousel>
      <Space h="xl" />
    </>
  );
}
