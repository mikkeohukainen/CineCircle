import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { Carousel } from "@mantine/carousel";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mantine/core";

// // Tämä vielä pitää kaivaa jostain muualta, nyt on kovakoodattuna
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_TOKEN,
  },
};

export default function UserFavorites() {
  const { username } = useAuth();

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const query = await fetch(`http://localhost:8000/users/${username}/favorites`);
        const response = await query.json();

        const tmdbData = response.map((favorite) => {
          if (favorite.type === "movie") {
            return fetch(`http://api.tmdb.org/3/movie/${favorite.tmdb_id}?language=en-US`, options);
          } else if (favorite.type === "series") {
            return fetch(`http://api.tmdb.org/3/tv/${favorite.tmdb_id}?language=en-US`, options);
          }
        });

        const tmdbDataResponse = await Promise.all(tmdbData);
        const movieData = await Promise.all(tmdbDataResponse.map((res) => res.json()));

        setFavorites(movieData);
        console.log(movieData);
      } catch (err) {
        console.error(err);
      }
    };
    getFavorites();
  }, [username]);

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
