import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

export default function Search({
  onSearch,
  language,
  searchedItems,
  onAddItem,
  recentlyUsedItems,
  onRecentItem,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        language={language}
        searchTerm={searchTerm}
      />
      <SearchResult
        searchTerm={searchTerm}
        searchedItems={searchedItems}
        onAddItem={onAddItem}
        recentlyUsedItems={recentlyUsedItems}
        onRecentItem={onRecentItem}
        language={language}
      />
    </>
  );

  function handleSearch(word) {
    setSearchTerm(word);
    onSearch(word);
  }
}
