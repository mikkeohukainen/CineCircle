import { SearchResults } from "../../components/SearchResults";
import {
  Container,
  SegmentedControl,
  useMantineTheme,
  Grid,
  Space,
  rem,
  Group,
  Select,
  Button,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function AdvancedSearchPage() {
  const [media, setMedia] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [genreID, setGenreID] = useState();
  const [providers, setProviders] = useState([]);
  const [providerID, setProviderID] = useState();
  const [actors, setActors] = useState([]);
  const [actorID, setActorID] = useState();

  useEffect(() => {
    getGenres();
    getProviders();
  }, [mediaType]);

  const getGenres = async () => {
    const data = await fetch("http://localhost:8000/search/genres/" + mediaType);
    const searchResults = await data.json();
    setGenres(() => searchResults.genres);
  };

  const getProviders = async () => {
    const data = await fetch("http://localhost:8000/search/providers/" + mediaType);
    const searchResults = await data.json();
    setProviders(() => searchResults);
  };

  const searchActors = async (query) => {
    if (!query) {
      setActors([]);
      return;
    }
    const data = await fetch("http://localhost:8000/search/people/name/" + query);
    const searchResults = await data.json();
    setActors(() => searchResults.filter((person) => person.name.includes(" ")));
  };

  const searchMedia = async () => {
    const fetchMedia = async (page) => {
      let URL = `http://localhost:8000/search/multi/filter?a=10&page=${page}&type=${mediaType}`;
      if (genreID && genreID !== 0) URL += `&genre=${genreID}`;
      if (providerID && providerID !== 0) URL += `&provider=${providerID}`;
      if (actorID && actorID !== 0) URL += `&people=${actorID}`;

      const response = await fetch(URL);
      const searchResults = await response.json();
      return searchResults.results;
    };
    const firstPageResults = await fetchMedia(1);
    const secondPageResults = await fetchMedia(2);

    const firstPageMovieIds = new Set(firstPageResults.map((movie) => movie.id));
    const filteredSecondsPage = secondPageResults.filter(
      (movie) => !firstPageMovieIds.has(movie.id),
    );

    setMedia([...firstPageResults, ...filteredSecondsPage]);
  };

  const genreOptions = genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  const providerOptions = providers.map((provider) => ({
    value: provider.provider_id.toString(),
    label: provider.provider_name,
  }));

  const actorOptions = actors.map((actor) => ({
    value: actor.id.toString(),
    label: actor.name,
  }));

  return (
    <Container size="xl" mt="lg">
      <Container>
        <Group justify="start">
          <SegmentedControl
            value={mediaType}
            onChange={setMediaType}
            data={[
              { label: "Movies", value: "movie" },
              { label: "TV shows", value: "tv" },
            ]}
            color="blue"
            size="md"
            radius="md"
            transitionDuration={300}
          />
        </Group>
        <Group justify="start" mt="lg">
          <Select
            label="Genre"
            placeholder="All"
            data={genreOptions}
            onChange={(value) => setGenreID(Number(value))}
            searchable
            clearable
            checkIconPosition="right"
            size="md"
            radius="md"
          />
          <Select
            label="Streaming on"
            placeholder="All"
            data={providerOptions}
            onChange={(value) => setProviderID(Number(value))}
            searchable
            clearable
            checkIconPosition="right"
            size="md"
            radius="md"
          />
          {mediaType === "movie" ? (
            <Select
              label="Actor"
              placeholder="All"
              data={actorOptions}
              onChange={(value) => setActorID(Number(value))}
              onSearchChange={searchActors}
              searchable
              clearable
              checkIconPosition="right"
              size="md"
              radius="md"
            />
          ) : (
            <Select
              label="Actor"
              placeholder="Not available for TV"
              disabled
              checkIconPosition="right"
              size="md"
              radius="md"
            />
          )}
        </Group>
        <Button
          onClick={searchMedia}
          mt="lg"
          radius="md"
          rightSection={<IconArrowRight size={16} />}
        >
          Search
        </Button>
      </Container>
      {/* {console.log("Genre id: " + genreID)}
      {console.log("Provider id: " + providerID)}
      {console.log("Actor id: " + actorID)} */}
      {/* {console.log(movies)} */}
      <SearchResults media={media} />
    </Container>
  );
}
