export const searchHistoryServices = {
  add: (searchText) => {
    const localSearchHistoryString = localStorage.getItem("search-history");
    const localSearchHistoryArray = localSearchHistoryString
      ? JSON.parse(localSearchHistoryString)
      : [];
    const reversedLocalSearchHistory = localSearchHistoryArray.reverse();
    reversedLocalSearchHistory.push(searchText);

    console.log(reversedLocalSearchHistory.reverse());
    localStorage.setItem(
      "search-history",
      JSON.stringify(reversedLocalSearchHistory.reverse())
    );

    console.log(localStorage.getItem("search-history"));
  },
  get: () => {
    const searchHistory = localStorage.getItem("search-history");
    return searchHistory ? JSON.parse(searchHistory) : [];
  },
  remove: (searchText, index) => {},
};
