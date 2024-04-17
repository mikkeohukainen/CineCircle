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
  const [groupShowtimeList, setGroupShowtimeList] = useState(null);

  useEffect(() => {
    async function getShowtimeIds() {
      const groupShowtimes = await getGroupShowtime(groupId);

      if (groupShowtimes !== null) {
        const requests = groupShowtimes.map((showtime) =>
          fetch(`http://localhost:8000/showtimes/${showtime.showtime_id}`).then((response) =>
            response.json(),
          ),
        );
        const showtimes = await Promise.all(requests);
        setGroupShowtimeList(showtimes);
      }
    }
    getShowtimeIds();
  }, []);

  return (
    <>
      <Stack gap="sm">
        {groupShowtimeList &&
          groupShowtimeList.map((showtime) => (
            <ShowtimeCard key={showtime.showtime_id} showtime={showtime.showtime_obj} />
          ))}
      </Stack>
    </>
  );
}
