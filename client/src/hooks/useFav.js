import { useContext } from "react";
import { FavContext } from "../contexts/FavContext.jsx";

export default function useFav() {
  return useContext(FavContext);
}
