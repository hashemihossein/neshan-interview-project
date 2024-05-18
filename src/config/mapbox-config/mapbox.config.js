import {
  defaultLat,
  defaultLng,
  MAP_KEY,
} from "../../constants/map/map.constants";

export const mapboxConfig = (ref, mapType) => {
  return {
    container: ref.current,
    mapType: mapType,
    zoom: 11,
    pitch: 0,
    center: [defaultLng, defaultLat],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: MAP_KEY,
    poi: false,
    traffic: false,
  };
};
