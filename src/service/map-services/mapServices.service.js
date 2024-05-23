import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import { mapInstance } from "../../config-instances";
import polyline from "@mapbox/polyline";

export const mapServices = {
  popups: [],
  marker: null,

  setInitialMap(mapRef, mapContainerRef, setLng, setLat, setZoom) {
    mapRef.current = mapInstance(mapContainerRef);
    mapRef.current.on("move", () => {
      setLng(mapRef.current.getCenter().lng.toFixed(4));
      setLat(mapRef.current.getCenter().lat.toFixed(4));
      setZoom(mapRef.current.getZoom().toFixed(2));
    });
  },

  addPolyline(mapRef, polylineString, distance, duration) {
    const coordinates = polyline.decode(polylineString);
    const geojsonCoordinates = coordinates.map((coord) => [coord[1], coord[0]]);

    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: geojsonCoordinates,
      },
    };
    this.mapRemoveLayersAndSources(mapRef);

    mapRef.current.addSource("route", {
      type: "geojson",
      data: geojson,
    });

    mapRef.current.addSource("route-border", {
      type: "geojson",
      data: geojson,
    });

    mapRef.current.addLayer({
      id: "route-border",
      type: "line",
      source: "route-border",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000000",
        "line-width": 10,
      },
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

    mapRef.current.addSource("origin", {
      type: "geojson",
      data: originIcon,
    });

    mapRef.current.addSource("destination", {
      type: "geojson",
      data: destinationIcon,
    });

    mapRef.current.addLayer({
      id: "origin",
      type: "symbol",
      source: "origin",
      layout: {
        "icon-image": "origin-icon",
        "icon-size": 1,
      },
    });

    mapRef.current.addLayer({
      id: "destination",
      type: "symbol",
      source: "destination",
      layout: {
        "icon-image": "custom-icon",
        "icon-size": 1,
        "icon-offset": [0, -10],
      },
    });

    const bounds = new nmp_mapboxgl.LngLatBounds(
      geojsonCoordinates[0],
      geojsonCoordinates[0]
    );
    for (let i = 0; i < geojsonCoordinates.length; i++) {
      bounds.extend(geojsonCoordinates[i]);
    }
    mapRef.current.fitBounds(bounds, {
      padding: {
        right: window.innerWidth / 4 + 50,
        left: 50,
        top: 50,
        bottom: 50,
      },
    });

    const middleIndex = Math.floor(coordinates.length / 2);
    const middlePoint = coordinates[middleIndex];

    const popup = new nmp_mapboxgl.Popup({ offset: 15, closeButton: false })
      .setLngLat([middlePoint[1], middlePoint[0]])
      .setHTML(`<p>${duration}</p><p>${distance}</p>`)
      .addTo(mapRef.current);

    this.popups.push(popup);
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

  mapSignleFitBound(mapRef, lng, lat) {
    if (mapRef.current) {
      const bounds = [
        [lng, lat],
        [lng, lat],
      ];
      mapRef.current.fitBounds(bounds, {
        padding: {
          right: window.innerWidth / 4 + 50,
          left: 50,
          top: 50,
          bottom: 50,
        },
        maxZoom: 15,
      });
    }
  },

  mapFitBounds(mapRef, geojsonData) {
    let bounds = new nmp_mapboxgl.LngLatBounds();

    geojsonData.features.forEach((feature) => {
      bounds.extend(feature.geometry.coordinates);
    });

    mapRef.current.fitBounds(bounds, {
      padding: {
        right: window.innerWidth / 4 + 50,
        left: 50,
        top: 50,
        bottom: 50,
      },
    });
  },

  async setMapLayer(mapRef, geojsonData) {
    await this.mapRemoveLayersAndSources(mapRef);

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
      maxzoom: 22,
    });

    this.mapFitBounds(mapRef, geojsonData);
  },

  async mapRemoveLayersAndSources(mapRef) {
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

    this.popups.forEach((popup) => {
      popup.remove();
    });
    this.popups = [];
  },
};
