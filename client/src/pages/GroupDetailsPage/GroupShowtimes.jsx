import { Stack } from "@mantine/core";
import { ShowtimeCard } from "../../components/ShowtimeCard";
import { getGroupShowtime } from "../../data/groupContent";
import { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { useLocation } from "react-router-dom";

export default function GroupShowtimes() {
  const location = useLocation();
  const groupDetails = location.state?.groupDetails;
  const groupId = groupDetails.group_id;
  const [groupShowtimeIds, setGroupShowtimeIds] = useState(null);
  const [groupShowtimes, setGroupShowtimes] = useState(null);

  useEffect(() => {
    async function getShowtimeIds() {
      const groupShowtimes = await getGroupShowtime(groupId);
      const showtimeIds = groupShowtimes.map((showtime) => showtime.showtime_id);
      setGroupShowtimeIds(showtimeIds);
    }
    getShowtimeIds();
  }, []);

  useEffect(() => {
    async function getShowtimes() {
      if (groupShowtimeIds !== null) {
        const requests = groupShowtimeIds.map((id) =>
          fetch(`http://localhost:8000/showtimes/${id}`).then((response) => response.json()),
        );

        const showtimes = await Promise.all(requests);
        setGroupShowtimes(showtimes);
      }
    }
    getShowtimes();
  }, [groupShowtimeIds]);

  return (
    <>
      <Stack gap="sm">
        {groupShowtimes &&
          groupShowtimes.map((showtime) => (
            <ShowtimeCard key={showtime.showtime_id} showtime={showtime.showtime_obj} />
          ))}
      </Stack>
    </>
  );
}
