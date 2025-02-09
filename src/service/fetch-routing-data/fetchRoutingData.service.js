import React from "react";
import { restClient } from "../../config-instances";

export const fetchRoutingData = async (
  origiLat,
  originLng,
  destinationLat,
  destinationLng,
  type = "car"
) => {
  const result = restClient
    .get("/v4/direction", {
      origin: `${origiLat},${originLng}`,
      destination: `${destinationLat},${destinationLng}`,
      type,
    })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw new Error(err?.message);
    });
  return result;
};
