import React, { useState } from "react";
import { restClient } from "../../instances/rest-client/rest-client.instance";

export const fetchSearchData = async (searchValue) => {
  try {
    await restClient
      .get("v1/search", { lat: 35.7219, lng: 51.3347, term: searchValue })
      .then((result) => {
        console.log(result, "this is result");
      })
      .catch((err) => {
        console.log(err, " this is err");
      });
  } catch (error) {}
};
