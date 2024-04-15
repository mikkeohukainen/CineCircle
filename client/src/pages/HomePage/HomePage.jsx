import { SearchBar } from "../../components/SearchBar";
import Trending from "./Trending.jsx";
import Recommendations from "./Recommendations.jsx";
import { Container, useMantineTheme, Space, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HomePage() {
  const { username, userId, isLoggedIn } = useAuth();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: { query: searchText } });
  };

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
      <Trending />
      {isLoggedIn && <Recommendations />}
    </Container>
  );
}
