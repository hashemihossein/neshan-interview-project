import React, { useRef, useEffect, useState, useContext } from "react";

import * as styles from "./App.module.css";
import { restClient } from "./instances";
import { Search } from "./component";
import { mapContext, searchContext, toastContext } from "./context";
import { convertToGeoJSON } from "./utils";
import { customIconBase64, originPolylineIcon } from "./constants";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { mapServices } from "./service";

function App() {
  const mapContainer = useRef(null);
  const [mapIconLoaded, setMapIconLoaded] = useState(false);
  const userMarkerRef = useRef(null);
  const { map, lng, setLng, lat, setLat, zoom, setZoom } =
    useContext(mapContext);
  const { addToast } = useContext(toastContext);
  const { searchResult } = useContext(searchContext);

  useEffect(() => {
    if (map.current) return;
    mapServices.setInitialMap(
      map,
      mapContainer,
      setLng,
      setLat,
      setZoom,
      userMarkerRef
    );
    mapServices.mapLoadImage(map, customIconBase64, "custom-icon");
    mapServices.mapLoadImage(map, originPolylineIcon, "origin-icon");
  });

  useEffect(() => {
    const geojsonData = convertToGeoJSON(searchResult?.items || []);
    if (map.current?.isStyleLoaded() && geojsonData.features.length > 0) {
      mapServices.setMapLayer(map, geojsonData);
    } else {
      mapServices.mapRemoveLayersAndSources(map);
    }
  }, [searchResult]);

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
