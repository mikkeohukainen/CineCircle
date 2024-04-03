import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { Carousel } from "@mantine/carousel";

export default function UserFavorites() {
  // DEBUG hardcoding - DELETE
  const userProfile = {
    username: "akuankka",
    userId: "75a7900f-f3cf-4c55-8958-d1a16bb92797",
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrdWFua2thIiwiaWF0IjoxNzExOTc1OTcyfQ.f7136dHoqWU9YWelAkPNfWosqAj8dcILCcLZTSer-bA",
  };

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const query = await fetch(`http://localhost:8000/users/${userProfile.username}/favorites`);
        const response = await query.json();
        setFavorites(response);
      } catch (err) {
        console.error(err);
      }
    };
    getFavorites();
  }, [userProfile.username]);

  // If not null, map favorites
  const favoritesSlide = favorites
    ? favorites.map((entry) => (
        <Carousel.Slide key={entry.tmdb_id}>
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
