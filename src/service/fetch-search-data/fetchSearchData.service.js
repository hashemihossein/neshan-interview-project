import React from "react";
import { restClient } from "../../instances";

export const fetchSearchData = async (searchValue) => {
  const result = restClient
    .get("v1/search", { lat: 35.7219, lng: 51.3347, term: searchValue })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw new Error(err?.message);
    });
  return result;
};
