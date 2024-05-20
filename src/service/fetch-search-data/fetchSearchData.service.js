import React from "react";
import { restClient } from "../../instances";

export const fetchSearchData = async (lat, lng, searchValue) => {
  const result = restClient
    .get("v1/search", { lat, lng, term: searchValue })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw new Error(err?.message);
    });
  return result;
};
