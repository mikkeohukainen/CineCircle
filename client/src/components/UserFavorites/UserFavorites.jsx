import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { Carousel } from "@mantine/carousel";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mantine/core";
import { getFavorites } from "../../data/favorites.js";

export default function UserFavorites() {
  const { username } = useAuth();

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);


  const fetchFavorites = async () => {
    try {
      const result = await getFavorites(username);
      // Muutetaan data ennen tilaan tallentamista
      const modifiedMedia = result.map(media => ({
        ...media,
        media_type: media.type, // muutetaan "type" -> "media_type"
        poster_path: media.poster_url, // muutetaan "poster_url" -> "poster_path"
        id: media.tmdb_id, // muutetaan "tmdb_id" -> "id"
      }));
      // sarjat ja leffat erilleen
      setFavorites(modifiedMedia);
    } catch (error) {
      console.error(error);
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
