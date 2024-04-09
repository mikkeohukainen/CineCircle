import { createContext, useEffect, useState } from "react";

export const FavContext = createContext({});

export default function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavContext.Provider>
  );
}
