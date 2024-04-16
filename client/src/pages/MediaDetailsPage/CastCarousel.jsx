import React, { useEffect, useState } from "react";
import { Image, Text, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

export default function CastCarousel({ creditsArray }) {
  const baseURL = "https://image.tmdb.org/t/p/w300";

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const castSlides = creditsArray.cast
    .filter((person) => person.profile_path !== null)
    .map((person) => (
      <Carousel.Slide key={person.credit_id}>
        <Image radius="md" src={baseURL + person.profile_path} />
        <Text size="sm" pt={4} fw={700}>
          {person.name}
        </Text>
        <Text c="dimmed" size="sm">
          {person.character}
        </Text>
      </Carousel.Slide>
    ));

  return (
    <Carousel
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
