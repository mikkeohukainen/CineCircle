import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { Carousel } from "@mantine/carousel";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mantine/core";

export default function UserFavorites() {
  const { username } = useAuth();

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const query = await fetch(`http://localhost:8000/users/${username}/favorites`);
      const response = await query.json();

      const tmdbData = response.map((favorite) => {
        if (favorite.type === "movie") {
          return fetch(`http://localhost:8000/search/movie/details/${favorite.tmdb_id}`);
        } else if (favorite.type === "series") {
          return fetch(`http://localhost:8000/search/tv/details/${favorite.tmdb_id}`);
        }
      });

      const tmdbDataResponse = await Promise.all(tmdbData);
      const movieData = await Promise.all(tmdbDataResponse.map((res) => res.json()));

      setFavorites(movieData);
      // console.log(movieData);
    } catch (err) {
      console.error(err);
    }
  };

  // If not null, map favorites
  const favoritesSlide = favorites
    ? favorites.map((entry) => (
        <Carousel.Slide key={entry.id}>
          <MovieCard movie={entry} />
        </Carousel.Slide>
      ))
    : null;

  return (
    <>
      <h3>Your favorites:</h3>
      <Carousel
        slideSize={{ base: "33.333%", sm: "20%" }}
        slideGap={{ base: "md", sm: "xl" }}
        align="start"
        controlSize={30}
      >
        {favoritesSlide}
      </Carousel>
    </>
  );
}
