import { useEffect, useMemo, useState } from "react";
import { ShowtimeCard } from "../../components/ShowtimeCard";
import { getFinnkinoShowtimes, getFinnkinoTheaterAreas } from "../../data/showtimes";
import {
  Container,
  Group,
  Select,
  Skeleton,
  Stack,
  Title,
  Pagination,
  Center,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

/**
 * Splits an array into chunks of a specified size.
 * @example chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 */
function chunk(array, chunkSize) {
  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState([]);
  const [theaterAreas, setTheaterAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState({
    value: "",
    label: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const [scroll, scrollTo] = useWindowScroll();

  const items = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} height={185} radius="md" />
      ));
    }

    if (!showtimes[activePage - 1]) {
      return [];
    }

    return showtimes[activePage - 1].map((showtime) => (
      <ShowtimeCard key={showtime.ID} showtime={showtime} />
    ));
  }, [selectedArea, isLoading, activePage]);

  useEffect(() => {
    getFinnkinoTheaterAreas()
      .then((response) => {
        const areas = response.TheatreAreas.TheatreArea;
        areas.shift();
        setTheaterAreas(areas);
        // The first area is selected by default
        setSelectedArea({
          value: String(areas[0].ID),
          label: areas[0].Name,
        });
      })
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedArea.value) {
      return;
    }
    setIsLoading(true);
    getFinnkinoShowtimes(selectedArea.value)
      .then((response) => {
        setShowtimes(chunk(response.Schedule.Shows.Show, 20));
      })
      .then(() => {
        setIsLoading(false);
        setPage(1);
      });
  }, [selectedArea]);

  return (
    <Container
      size={{
        xs: "xs",
        sm: "lg",
      }}
      my="lg"
    >
      <Group position="center" justify="space-between" pb={20}>
        <Title>Showtimes</Title>
        <Select
          data={theaterAreas.map((area) => ({ value: String(area.ID), label: area.Name }))}
          value={selectedArea.value}
          searchable
          onChange={(_value, option) => {
            setSelectedArea(option);
          }}
        />
      </Group>
      <Stack gap="sm">{items}</Stack>
      <Center>
        <Pagination
          total={showtimes.length}
          value={activePage}
          onChange={(e) => {
            scrollTo({ y: 0 });
            setPage(e);
          }}
          mt="sm"
        />
      </Center>
    </Container>
  );
}
