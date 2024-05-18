import React, { useRef, useEffect, useState } from "react";

import * as styles from "./App.module.css";
import { mapInstance, restClient } from "./instances";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(51.389);
  const [lat, setLat] = useState(35.6892);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = mapInstance(mapContainer);
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setLat(position.coords.latitude);
  //       setLng(position.coords.longitude);
  //       map.current.panTo(
  //         [position.coords.longitude, position.coords.latitude],
  //         { duration: 3000 }
  //       );

  //       console.log("geolocation is ", position);
  //     });
  //   } else {
  //     console.log("Geolocation is not available in your browser.");
  //   }
  // }, []);

  return (
    <>
      <div ref={mapContainer} className={styles.mapContainer}></div>
    </>
  );
}
//App.jsx:61 59.6061 36.2960

export default App;
