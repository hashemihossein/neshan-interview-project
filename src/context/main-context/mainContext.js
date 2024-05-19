import React, { createContext, useState } from "react";
import { defaultLat, defaultLng } from "../../constants/map/map.constants";

export const mainContext = createContext(null);

export function ContextProvider({ children }) {
  const [lat, setLat] = useState(defaultLat);
  const [lng, setLng] = useState(defaultLng);
  const [zoom, setZoom] = useState(15);
  return (
    <mainContext.Provider value={{ lat, setLat, lng, setLng, zoom, setZoom }}>
      {children}
    </mainContext.Provider>
  );
}
