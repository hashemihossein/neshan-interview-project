import React, { useRef, useEffect, useState, useContext } from "react";

import * as styles from "./App.module.css";
import { Sidebar } from "./component";
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
    const geolocateControl = new nmp_mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });
    map.current.addControl(geolocateControl, "top-left");
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
        <Sidebar />
      </div>
    </>
  );
}

export default App;
