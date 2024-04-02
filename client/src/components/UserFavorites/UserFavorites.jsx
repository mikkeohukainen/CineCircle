import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";

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
        const query = await fetch(
          `http://localhost:8000/users/${userProfile.username}/favorites`
        );
        const response = await query.json();
        setFavorites(response);
      } catch (err) {
        console.error(err);
      }
    };
    getFavorites();
  }, []);

  return (
    <>
      <h1>{userProfile.username}</h1>
      <p>Your favorites:</p>
      {/* favorites is JSON array []
      goes null after reload with F5 ??  wth is this error */}
      {JSON.stringify(favorites[0], null, 2)}
      {/* Does not go null after F5 */}
      {/* {JSON.stringify(favorites)} */}
      {/* TODO: moviecard here ? */}
    </>
  );
}
