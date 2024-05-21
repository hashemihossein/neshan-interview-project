import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { mapInstance } from "../../instances";

export const mapServices = {
  setInitialMap(mapRef, mapContainerRef, setLng, setLat, setZoom) {
    mapRef.current = mapInstance(mapContainerRef);

    mapRef.current.on("load", () => {
      mapRef.current.on("click", (e) => {
        const features = mapRef.current.queryRenderedFeatures(e.point, {
          layers: ["points-layer"],
        });
        if (features.length > 0) {
          const coordinates = features[0].geometry.coordinates.slice();
          this.mapFlyTo(mapRef, coordinates);
        }
      });
    });

    mapRef.current.on("move", () => {
      setLng(mapRef.current.getCenter().lng.toFixed(4));
      setLat(mapRef.current.getCenter().lat.toFixed(4));
      setZoom(mapRef.current.getZoom().toFixed(2));
    });
  },

  mapLoadImage(mapRef, image) {
    mapRef.current.loadImage(
      `data:image/svg;base64,${image}`,
      function (error, img) {
        if (error) {
          throw error;
        }
        mapRef.current.addImage("custom-icon", img);
      }
    );
  },

  mapFitBounds(mapRef, geojsonData) {
    let bounds = new nmp_mapboxgl.LngLatBounds();

    geojsonData.features.forEach((feature) => {
      bounds.extend(feature.geometry.coordinates);
    });

    mapRef.current.fitBounds(bounds, {
      padding: {
        right: 30,
        left: 30,
        top: 30,
        bottom: 30,
      },
    });
  },

  setMapLayer(mapRef, geojsonData) {
    if (mapRef.current.getLayer("points-layer")) {
      mapRef.current.removeLayer("points-layer");
    }
    if (mapRef.current.getSource("points-source")) {
      mapRef.current.removeSource("points-source");
    }

    mapRef.current.addSource("points-source", {
      type: "geojson",
      data: geojsonData,
    });

    mapRef.current.addLayer({
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

    this.mapFitBounds(mapRef, geojsonData);
  },

  mapFlyTo(mapRef, coordinates, zoom = 15) {
    mapRef.current.flyTo({
      center: coordinates,
      zoom: zoom,
      essential: true,
      padding: { right: window.innerWidth / 4 },
    });
  },
};
