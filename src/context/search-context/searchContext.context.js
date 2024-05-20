import React, { createContext, useState } from "react";
import { defaultLat, defaultLng } from "../../constants/map/map.constants";

export const searchContext = createContext(null);

export function SearchContextProvider({ children }) {
  const [searchResult, setSearchResult] = useState({});
  const [searchedText, setSearchedText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  return (
    <searchContext.Provider
      value={{
        searchResult,
        setSearchResult,
        searchedText,
        setSearchedText,
        apiLoading,
        setApiLoading,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
