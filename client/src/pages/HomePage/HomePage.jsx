import { SearchBar } from "../../components/SearchBar";
import { MovieCard } from "../../components/MovieCard";
import { Container, useMantineTheme, Space, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [TVShows, setTVShows] = useState([]);
  const navigate = useNavigate();

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
    console.log("Trending movies fetched");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: { query: searchText } });
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
    <Container size="xl" mt="lg" mb="xl">
      <Container size="sm">
        <form onSubmit={handleSubmit}>
          <SearchBar
            placeholder="Search movies and TV shows"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </Container>

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
    </Container>
  );
}
