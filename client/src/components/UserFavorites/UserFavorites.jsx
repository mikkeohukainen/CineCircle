import { useState, useEffect } from "react";

export default function UserFavorites() {
  // DEBUG hardcoding - DELETE
  const userProfile = {
    username: "akuankka",
    userId: "75a7900f-f3cf-4c55-8958-d1a16bb92797",
    jwtToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrdWFua2thIiwiaWF0IjoxNzExOTc1OTcyfQ.f7136dHoqWU9YWelAkPNfWosqAj8dcILCcLZTSer-bA",
  };

  try {
    const query = fetch(
      "http://localhost:8000/users/${userProfile.username}/favorites"
    );
    if (!query.ok) {
      throw new Error("not ok");
    }
    const tmpjson = query.json();
    console.log(tmpjson);
  } catch (err) {
    console.error(err);
  }

  // TODO: fetch favorites

  // TODO: display favorites
  return <>{userProfile.username}</>;
}
