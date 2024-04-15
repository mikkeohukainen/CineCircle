import { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { getGroupMedia, getMovieDetails, getSeriesDetails } from "../../data/groupContent";
import { Container, useMantineTheme, Title, Space, Text, } from "@mantine/core";
import { MovieCard } from "../../components/MovieCard";
import { useMediaQuery } from "@mantine/hooks";

export default function GroupMedia({ groupId }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [groupMedia, setGroupMedia] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState([]);

  useEffect(() => {
    getMedia();
  }, []);

  useEffect(() => {
    if (groupMedia.length > 0) {
      fetchAllDetails();
    }
  }, [groupMedia]);

  const getMedia = async () => {
    try {
      const result = await getGroupMedia(groupId);
      setGroupMedia(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllDetails = async () => {
    const newMovieDetails = [];
    const newSeriesDetails = [];

    for (const mediaItem of groupMedia) {
      if (mediaItem.type === "movie") {
        try {
          const movieResult = await getMovieDetails(mediaItem.tmdb_id);
          newMovieDetails.push({
            ...movieResult.data,
            content_id: mediaItem.content_id, //content_id is needed later when deleting group media
            username: mediaItem.username // who added
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      } else if (mediaItem.type === "series") {
        try {
          const seriesResult = await getSeriesDetails(mediaItem.tmdb_id);
          newSeriesDetails.push({
            ...seriesResult.data,
            content_id: mediaItem.content_id, //content_id is needed later when deleting group media
            username: mediaItem.username
          });
        } catch (error) {
          console.error("Error fetching series details:", error);
        }
      }
    }
    setMovieDetails(newMovieDetails);
    setSeriesDetails(newSeriesDetails);
  };
  const movieSlides = movieDetails.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
      <Text style={{ fontWeight: 'bold' }} size="lg" ta="center">{item.title}</Text>
      <Text ta="center">Added by: {item.username}</Text>
    </Carousel.Slide>
  ));

  const seriesSlides = seriesDetails.map((item) => (
    <Carousel.Slide key={item.id}>
      <MovieCard movie={item} />
      <Text style={{ fontWeight: 'bold' }} size="lg" ta="center">{item.name}</Text>
      <Text ta="center">Added by: {item.username}</Text>
    </Carousel.Slide>
  ));

  return (
    <Container size="xl">

      <Title ta="center" order={3}>
        GROUP MOVIES
        </Title>

      {movieDetails.length > 0 ? (
        <Carousel
          slideSize={{ base: "33.333%", sm: "20%" }}
          slideGap={{ base: "md", sm: "xl" }}
          align="start"
          controlSize={30}
          loop={true}
          slidesToScroll={mobile ? 3 : 5}
          mt="sm"
          mb="xl"
        >
          {movieSlides}
        </Carousel>
      ) : (
        <Text ta="center">No movies added to the group</Text>
      )}
      <Space h="xl" />


      <Title ta="center" order={3}>
        GROUP SERIES
        </Title>
      {seriesDetails.length > 0 ? (
        <Carousel
          slideSize={{ base: "33.333%", sm: "20%" }}
          slideGap={{ base: "md", sm: "xl" }}
          align="start"
          controlSize={30}
          loop={true}
          slidesToScroll={mobile ? 3 : 5}
          mt="sm"
        >
          {seriesSlides}
        </Carousel>
      ) : (
        <Text ta="center">No series added to the group</Text>
      )}
    </Container>
  );
}
