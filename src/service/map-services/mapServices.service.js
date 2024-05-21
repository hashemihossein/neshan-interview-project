import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { mapInstance } from "../../instances";
import polyline from "@mapbox/polyline";

export const mapServices = {
  addPolyline(mapRef, polylineString) {
    const coordinates = polyline.decode(polylineString);
    const geojsonCoordinates = coordinates.map((coord) => [coord[1], coord[0]]);

    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: geojsonCoordinates,
      },
    };
    console.log(geojson, "this is geoJson");
    this.mapRemoveLayersAndSources(mapRef);

    mapRef.current.addSource("route", {
      type: "geojson",
      data: geojson,
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#8a1ef7",
        "line-width": 8,
      },
    });

    const originIcon = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: geojsonCoordinates[0],
      },
    };

    const destinationIcon = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: geojsonCoordinates[geojsonCoordinates.length - 1],
      },
    };
  },

  setInitialMap(mapRef, mapContainerRef, setLng, setLat, setZoom) {
    mapRef.current = mapInstance(mapContainerRef);

    mapRef.current.on("move", () => {
      setLng(mapRef.current.getCenter().lng.toFixed(4));
      setLat(mapRef.current.getCenter().lat.toFixed(4));
      setZoom(mapRef.current.getZoom().toFixed(2));
    });
  },

  mapLoadImage(mapRef, image, name) {
    mapRef.current.loadImage(
      `data:image/svg;base64,${image}`,
      function (error, img) {
        if (error) {
          throw error;
        }
        mapRef.current.addImage(name, img);
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
    this.mapRemoveLayersAndSources(mapRef);

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
        "icon-size": 1,
        "icon-offset": [0, -10],
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

  mapRemoveLayersAndSources(mapRef) {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const layers = mapRef.current.getStyle().layers;
    if (layers) {
      for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        if (mapRef.current.getLayer(layer.id)) {
          mapRef.current.removeLayer(layer.id);
        }
      }
    }

    const sources = mapRef.current.getStyle().sources;
    for (const sourceId in sources) {
      if (mapRef.current.getSource(sourceId)) {
        mapRef.current.removeSource(sourceId);
      }
    }
  },
};
