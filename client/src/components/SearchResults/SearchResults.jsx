import { MovieCard } from "../../components/MovieCard";
import { Container, useMantineTheme, Grid, Space, rem } from "@mantine/core";

export default function SearchResults({ media }) {
  const mediaArray = media;
  return (
    <Container size="lg">
      <Space h="xl" />
      <Grid mt="xl">
        {mediaArray.map((mediaObj) => (
          <Grid.Col span={{ base: 4, md: 4, lg: 3 }} key={mediaObj.id}>
            <MovieCard movie={mediaObj} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
