import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import { mapboxConfig } from "../../config";

export const mapInstance = (ref) => {
  const map = new nmp_mapboxgl.Map(
    mapboxConfig(ref, nmp_mapboxgl.Map.mapTypes.neshanVector)
  );
  return map;
};
