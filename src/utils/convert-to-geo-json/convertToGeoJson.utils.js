export const convertToGeoJSON = (data) => {
  return {
    type: "FeatureCollection",
    features: data.map((item) => ({
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
