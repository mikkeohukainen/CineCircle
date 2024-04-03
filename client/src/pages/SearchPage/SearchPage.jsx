import { SearchBar } from "../../components/SearchBar";
import { MovieCard } from "../../components/MovieCard";
import { Container, useMantineTheme, Grid, Space, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.query) {
      setSearchText(location.state.query);
      searchMovies(location.state.query);
    }
  }, []);

  const searchMovies = async (query) => {
    const searchQuery = !query ? searchText : query;
    if (!searchQuery.trim()) {
      console.log("No search query provided");
      return;
    }
    console.log(searchQuery);
    const data = await fetch(
      "http://localhost:8000/search/multi/title/" + searchQuery
    );
    const searchResults = await data.json();
    setMovies(() => searchResults.results);
    console.log("Movies searched");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const theme = useMantineTheme();

  return (
    <Container size="xl" mt="lg">
      <Container size="sm" mb="lg">
        <form onSubmit={handleSearch}>
          <SearchBar
            placeholder="Search movies and TV shows"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </Container>
      <Container size="lg">
        <Space h="xl" />
        <Grid mt="xl">
          {movies.map((movie) => (
            <Grid.Col span={{ base: 4, md: 4, lg: 3 }} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
