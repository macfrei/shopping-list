import styled from "styled-components";
import { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import SearchItem from "./components/SearchItem";
import { useEffect } from "react";
import { Searcher } from "fast-fuzzy";
import { loadFromLocal, saveToLocal } from "./utils/localStorage";
import ActiveShoppingList from "./components/ActiveShoppingList";
import CollabsibleSection from "./components/CollabsibleSection";

function App() {
  const [activeShoppingList, setActiveShoppingList] = useState(
    loadFromLocal("shopping-list") ?? []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [language, setLanguage] = useState(loadFromLocal("language") ?? "en");
  const [recentlyUsedItems, setRecentlyUsedItems] = useState(
    loadFromLocal("recently-used") ?? []
  );

  const noMatch = searchTerm !== "" && searchedItems.length === 0;

  useEffect(() => {
    loadShoppingItems();
    async function loadShoppingItems() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data = await response.json();
        const categorieRes = await fetch(
          "https://fetch-me.vercel.app/api/shopping/categories"
        );
        const categories = await categorieRes.json();

        const searcher = new Searcher(data.data, {
          keySelector: (obj) => obj.name[language],
        });
        const searchedData = searcher.search(searchTerm);

        const searchedDataWithCategroy = searchedData.map((item) => {
          const category = categories.data.find(
            (el) => el._id === item.category._ref
          );
          return { ...item, category: category.name };
        });

        setSearchedItems(searchedDataWithCategroy);
      } catch (error) {
        console.error(error);
      }
    }
  }, [searchTerm, language]);

  useEffect(() => {
    saveToLocal("shopping-list", activeShoppingList);
    saveToLocal("recently-used", recentlyUsedItems);
    saveToLocal("language", language);
  }, [activeShoppingList, recentlyUsedItems, language]);

  return (
    <Wrapper>
      <h1>{language === "en" ? "My shopping list" : "Meine Einkaufsliste"}</h1>
      <button onClick={() => setLanguage("en")}>en</button>
      <button onClick={() => setLanguage("de")}>de</button>
      <ActiveShoppingList
        activeShoppingList={activeShoppingList}
        onToggleActiveItem={deleteItem}
        language={language}
      />
      <SearchItem
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        language={language}
      />
      {searchedItems && (
        <ShoppingList
          shoppingList={searchedItems}
          onToggleActiveItem={addItem}
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
          onToggleActiveItem={handleRecentItem}
          language={language}
        />
      )}
    </Wrapper>
  );

  function handleRecentItem(recentItem) {
    setActiveShoppingList([...activeShoppingList, recentItem]);
    setRecentlyUsedItems(
      recentlyUsedItems.filter((item) => item._id !== recentItem._id)
    );
  }

  function deleteItem(clickedItem) {
    const newItemList = activeShoppingList.filter(
      (item) => item._id !== clickedItem._id
    );
    setActiveShoppingList(newItemList);
    setRecentlyUsedItems([clickedItem, ...recentlyUsedItems]);
  }

  function addItem(item) {
    const includesItem = activeShoppingList
      .map((item) => item._id)
      .includes(item._id);
    if (!includesItem) {
      setActiveShoppingList([...activeShoppingList, item]);
      setRecentlyUsedItems(
        recentlyUsedItems.filter(
          (recentlyUsed) => recentlyUsed._id !== item._id
        )
      );
    } else {
      console.log("Item already in array!");
    }
    setSearchTerm("");
  }
}

export default App;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
