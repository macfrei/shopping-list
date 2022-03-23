import CollabsibleSection from "../CollabsibleSection";
import ShoppingList from "../ShoppingList";

export default function SearchResult({
  searchedItems,
  onAddItem,
  language,
  recentlyUsedItems,
  onRecentItem,
  searchTerm,
}) {
  const noMatch = searchTerm !== "" && searchedItems.length === 0;

  return (
    <>
      {searchedItems && (
        <ShoppingList
          shoppingList={searchedItems}
          onToggleActiveItem={onAddItem}
          language={language}
        />
      )}
      {noMatch && (
        <p>
          {language === "en"
            ? "We could not find what you were looking for. For that we are truly sorry."
            : "Sorry, das Gesuchte konnte nicht gefunden werden"}
        </p>
      )}
      {!searchTerm && (
        <CollabsibleSection
          shoppingList={recentlyUsedItems}
          title={language === "en" ? "Recently used" : "Vor Kurzem gesucht"}
          onToggleActiveItem={onRecentItem}
          language={language}
        />
      )}
    </>
  );
}
