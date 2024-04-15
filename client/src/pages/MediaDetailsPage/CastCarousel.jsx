import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  useMantineTheme,
  Overlay,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function CastCarousel({ creditsArray }) {
  const navigate = useNavigate();
  const baseURL = "https://image.tmdb.org/t/p/w300";

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const castSlides = creditsArray.cast
    .filter((person) => person.profile_path !== null)
    .map((person) => (
      <Carousel.Slide key={person.credit_id}>
        <Image
          radius="md"
          src={baseURL + person.profile_path}
          onClick={() => navigate("/actor", { state: { id: person.id } })}
          style={{
            cursor: "pointer",
          }}
        ></Image>
        <Text fw={700}>{person.name}</Text>
      </Carousel.Slide>
    ));

  return (
    <Carousel
      mt="md"
      slideSize={{ base: "33.333%", sm: "20%" }}
      slideGap={{ base: "sm", sm: "lg" }}
      align="start"
      slidesToScroll={mobile ? 3 : 5}
      controlSize={30}
    >
      {castSlides}
    </Carousel>
  );
}
