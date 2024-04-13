import { useEffect, useState } from "react";
import { ShowtimeCard } from "../../components/ShowtimeCard";
import { getFinnkinoShowtimes, getFinnkinoTheaterAreas } from "../../data/showtimes";
import { Container, Group, Select, Stack, Title } from "@mantine/core";

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState([]);
  const [theaterAreas, setTheaterAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    getFinnkinoTheaterAreas().then((response) => {
      const areas = response.TheatreAreas.TheatreArea;
      setTheaterAreas(areas);
      // The first area is selected by default
      setSelectedArea({
        value: String(areas[0].ID),
        label: areas[0].Name,
      });
    });
  }, []);

  useEffect(() => {
    getFinnkinoShowtimes(selectedArea.value).then((response) => {
      setShowtimes(response.Schedule.Shows.Show);
    });
  }, [selectedArea]);

  return (
    <Container
      size={{
        xs: "xs",
        sm: "lg",
      }}
      mt="lg"
    >
      <Group position="center" justify="space-between" pb={20}>
        <Title>Showtimes</Title>
        <Select
          data={theaterAreas.map((area) => ({ value: String(area.ID), label: area.Name }))}
          value={selectedArea.value}
          onChange={(_value, option) => {
            setSelectedArea(option);
          }}
        />
      </Group>
      <Stack gap="sm">
        {showtimes.map((showtime) => (
          <ShowtimeCard key={showtime.ID} showtime={showtime} />
        ))}
      </Stack>
    </Container>
  );
}
