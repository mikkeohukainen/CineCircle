import { SearchBar } from "../../components/SearchBar";
import { SearchResults } from "../../components/SearchResults";
import { Container, useMantineTheme, Grid, Space, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMedia } from "../../data/media";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedSearchText = sessionStorage.getItem("searchText") || "";
    setSearchText(savedSearchText);

    (async () => {
      if (savedSearchText) {
        await searchMovies(savedSearchText);
      } else if (location.state && location.state.query) {
        setSearchText(location.state.query);
        await searchMovies(location.state.query);
      }
    })();
  }, []);

  const searchMovies = async (query) => {
    const searchQuery = !query ? searchText : query;
    if (!searchQuery.trim()) {
      console.log("No search query provided");
      return;
    }
    console.log(searchQuery);
    try {
      const searchResults = await searchMedia(searchQuery);
      setMovies(() => searchResults.results);
      console.log("Movies searched");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    sessionStorage.setItem("searchText", searchText);
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
      <SearchResults media={movies} />
    </Container>
  );
}
