import { finnkino } from "./api";

export async function getFinnkinoShowtimes(areaId) {
  const { data } = await finnkino.get("/Schedule/", {
    params: {
      area: areaId,
    },
  });
  return data;
}

export async function getFinnkinoTheaterAreas() {
  const { data } = await finnkino.get("/TheatreAreas/");
  return data;
}
