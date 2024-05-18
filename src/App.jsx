import React, { useRef, useEffect, useState } from "react";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new nmp_mapboxgl.Map({
      container: mapContainer.current,
      mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
      zoom: 11,
      pitch: 0,
      center: [51.389, 35.6892],
      minZoom: 2,
      maxZoom: 21,
      trackResize: true,
      mapKey: "web.0b0e490b0bdb4b4abf4fde28c42dd54a",
      poi: false,
      traffic: false,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
    </>
  );
}

export default App;
