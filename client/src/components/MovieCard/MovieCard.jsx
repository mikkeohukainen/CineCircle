import { Button, Image } from "@mantine/core";
import classes from "./MovieCard.module.css";
import noimage from "../../assets/no-image.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/details", { state: { obj: movie } });
  };

  const baseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={classes.cardContainer}>
      <Image
        src={
          movie.media_type === "person" || movie.poster_path === null
            ? noimage
            : baseURL + movie.poster_path
        }
        className={classes.image}
      />
      <button className={classes.invisibleButton} onClick={handleClick}></button>
    </div>
  );
}
