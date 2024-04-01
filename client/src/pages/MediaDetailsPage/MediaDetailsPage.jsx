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
  useMantineTheme
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

export default function MediaDetailsPage() {
  const location = useLocation();
  const [movieObj, setMovieObj] = useState(location.state.obj);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getImages();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getImages = async () => {
    const data = await fetch("http://localhost:8000/search/movie/images/" + movieObj.id);
    const searchResults = await data.json();
    setImages(() => searchResults.backdrops);
    console.log("Images fetched");
  };

  const baseURL = "https://image.tmdb.org/t/p/original";

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const imageSlides = images.map((image) => (
    <Carousel.Slide key={image.file_path}>
      <Image src={baseURL + image.file_path}></Image>
    </Carousel.Slide>
  ));

  return (
    <Container size="lg" mt="lg">
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Card.Section>
          {/* <Image
            src={baseURL + movieObj.backdrop_path}
            //   height={160}
            alt="Norway"
          /> */}
          <Carousel
            slideSize={{ base: "100%", sm: "100%" }}
            slideGap={{ base: "md", sm: "xl" }}
            align="start"
            slidesToScroll={mobile ? 1 : 1}
            controlSize={30}
          >
            {imageSlides}
          </Carousel>
        </Card.Section>

        <Title ta="center" mt="md" order={1}>{movieObj.title || movieObj.name}</Title>
        <Text ta="center" size="xl" mt="md">{movieObj.overview}</Text>
        <Container>
            <Badge variant="light" color="blue" size="xl" radius="md" mt="md">
                {"Release date: " + movieObj.release_date}
            </Badge>
            <Group mt="md" mb="xs">
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
                <Badge color="gray" size="xl" radius="md" mt="md">
                    Genre
                </Badge>
            </Group>
        </Container>

        {/* <Title ta="center" c="blue" mt="md" order={2}>Cast</Title> */}

        {/* <Container>
          <Carousel
            slideSize={{ base: "100%", sm: "100%" }}
            slideGap={{ base: "md", sm: "xl" }}
            align="start"
            slidesToScroll={mobile ? 1 : 1}
            controlSize={30}
          >
            {imageSlides}
          </Carousel>
        </Container> */}

        <Button color="blue" mt="md" radius="md" fullWidth>
          Add to favorites
        </Button>
      </Card>
    </Container>
  );
}
