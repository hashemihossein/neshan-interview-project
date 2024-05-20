import React, { useRef, useEffect, useState, useContext } from "react";

import * as styles from "./App.module.css";
import { mapInstance, restClient } from "./instances";
import { Search } from "./component";
import { mainContext, searchContext } from "./context";
import { convertToGeoJSON } from "./utils";
import { customIconBase64 } from "./constants";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

const setMapLayer = (map, geojsonData) => {
  if (map.current.getLayer("points-layer")) {
    map.current.removeLayer("points-layer");
  }
  if (map.current.getSource("points-source")) {
    map.current.removeSource("points-source");
  }

  map.current.addSource("points-source", {
    type: "geojson",
    data: geojsonData,
  });

  map.current.addLayer({
    id: "points-layer",
    type: "symbol",
    source: "points-source",
    layout: {
      "icon-image": "custom-icon",
      "icon-size": 0.05,
      "icon-allow-overlap": true,
      "symbol-spacing": 50,
    },
    minzoom: 2,
    maxzoom: 21,
  });

  let bounds = new nmp_mapboxgl.LngLatBounds();

  geojsonData.features.forEach((feature) => {
    bounds.extend(feature.geometry.coordinates);
  });

  map.current.fitBounds(bounds, {
    padding: {
      right: window.innerWidth / 4 + 30,
      left: 30,
      top: 30,
      bottom: 30,
    },
  });
};

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapIconLoaded, setMapIconLoaded] = useState(false);
  const { lng, setLng, lat, setLat, zoom, setZoom } = useContext(mainContext);

  useEffect(() => {
    if (map.current) return;
    map.current = mapInstance(mapContainer);
    map.current.loadImage(
      `data:image/svg;base64,${customIconBase64}`,
      function (error, image) {
        if (error) {
          throw error;
        }
        map.current.addImage("custom-icon", image);
        setMapIconLoaded(true);
      }
    );
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const { searchResult } = useContext(searchContext);

  useEffect(() => {
    const geojsonData = convertToGeoJSON(searchResult?.items || []);
    if (
      map.current?.isStyleLoaded() &&
      mapIconLoaded &&
      geojsonData.features.length > 0
    ) {
      setMapLayer(map, geojsonData);
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
