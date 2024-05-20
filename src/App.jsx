import React, { useRef, useEffect, useState, useContext } from "react";

import * as styles from "./App.module.css";
import { mapInstance, restClient } from "./instances";
import { Search } from "./component";
import { mainContext, searchContext } from "./context";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { lng, setLng, lat, setLat, zoom, setZoom } = useContext(mainContext);

  useEffect(() => {
    if (map.current) return;
    map.current = mapInstance(mapContainer);
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const { searchResult } = useContext(searchContext);

  useEffect(() => {
    console.log("searchResult is changd!");
  }, [searchResult]);

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
      <div ref={mapContainer} className={styles.mapContainer}>
        <div className={styles.componentContainer}>
          <Search />
        </div>
      </div>
    </>
  );
}
//App.jsx:61 59.6061 36.2960

export default App;
