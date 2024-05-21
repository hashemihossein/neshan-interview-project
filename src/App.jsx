import React, { useRef, useEffect, useState, useContext } from "react";

import * as styles from "./App.module.css";
import { restClient } from "./instances";
import { Search } from "./component";
import { mapContext, searchContext } from "./context";
import { convertToGeoJSON } from "./utils";
import { customIconBase64 } from "./constants";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { mapServices } from "./service";

function App() {
  const mapContainer = useRef(null);
  const [mapIconLoaded, setMapIconLoaded] = useState(false);

  const { map, lng, setLng, lat, setLat, zoom, setZoom } =
    useContext(mapContext);
  const { searchResult } = useContext(searchContext);

  useEffect(() => {
    if (map.current) return;
    mapServices.setInitialMap(map, mapContainer, setLng, setLat, setZoom);
    mapServices.mapFlyTo(map, [lng, lat], 11);
    mapServices.mapLoadImage(map, customIconBase64);
  });

  useEffect(() => {
    const geojsonData = convertToGeoJSON(searchResult?.items || []);
    if (map.current?.isStyleLoaded() && geojsonData.features.length > 0) {
      mapServices.setMapLayer(map, geojsonData);
    } else {
      if (map.current.getLayer("points-layer")) {
        map.current.removeLayer("points-layer");
      }
      if (map.current.getSource("points-source")) {
        map.current.removeSource("points-source");
      }
    }
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
        {/* <div className={styles.componentContainer}> */}
        <Search />
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
