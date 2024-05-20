export const convertToGeoJSON = (apiData) => {
  return {
    type: "FeatureCollection",
    features: apiData.map((item) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item?.location?.x, item?.location?.y],
      },
      properties: {
        name: item?.title,
      },
    })),
  };
};
