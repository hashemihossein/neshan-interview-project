export const searchHistoryServices = {
  add: (searchText) => {
    const localSearchHistoryString = localStorage.getItem("search-history");
    const localSearchHistoryArray = localSearchHistoryString
      ? JSON.parse(localSearchHistoryString)
      : [];
    const reversedLocalSearchHistory = localSearchHistoryArray.reverse();
    if (
      searchText !==
      reversedLocalSearchHistory[reversedLocalSearchHistory.length - 1]
    ) {
      reversedLocalSearchHistory.push(searchText);
    }
    if (reversedLocalSearchHistory.length > 10) {
      reversedLocalSearchHistory.shift();
    }
    localStorage.setItem(
      "search-history",
      JSON.stringify(reversedLocalSearchHistory.reverse())
    );
  },
  get: () => {
    const searchHistory = localStorage.getItem("search-history");
    return searchHistory ? JSON.parse(searchHistory) : [];
  },
};
