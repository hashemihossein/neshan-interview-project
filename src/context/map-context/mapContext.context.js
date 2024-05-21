import React, { createContext, useState, useRef } from "react";
import { defaultLat, defaultLng } from "../../constants";

export const mapContext = createContext(null);

export function MapContextProvider({ children }) {
  const map = useRef(null);
  const [lat, setLat] = useState(defaultLat);
  const [lng, setLng] = useState(defaultLng);
  const [zoom, setZoom] = useState(15);
  return (
    <mapContext.Provider
      value={{ map, lat, setLat, lng, setLng, zoom, setZoom }}
    >
      {children}
    </mapContext.Provider>
  );
}
