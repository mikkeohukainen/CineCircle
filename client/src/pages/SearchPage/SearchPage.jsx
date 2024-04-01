import { SearchBar } from "../../components/SearchBar";
import { Container, useMantineTheme, rem } from "@mantine/core";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  const theme = useMantineTheme();

  return (
    <Container size="xl" mt="lg">
      <Container size="sm">
        <form>
          <SearchBar
            placeholder="Search movies and TV shows"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </Container>
    </Container>
  );
}
