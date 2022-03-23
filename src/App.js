import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Searcher } from "fast-fuzzy";
import { loadFromLocal, saveToLocal } from "./utils/localStorage";
import ActiveShoppingList from "./components/ActiveShoppingList";
import Search from "./components/Search";

function App() {
  const [activeShoppingList, setActiveShoppingList] = useState(
    loadFromLocal("shopping-list") ?? []
  );
  const [recentlyUsedItems, setRecentlyUsedItems] = useState(
    loadFromLocal("recently-used") ?? []
  );
  const [language, setLanguage] = useState(loadFromLocal("language") ?? "en");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    loadShoppingItems();
    async function loadShoppingItems() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const { data: itemData } = await response.json();
        const categorieRes = await fetch(
          "https://fetch-me.vercel.app/api/shopping/categories"
        );
        const { data: categoryData } = await categorieRes.json();

        setCategories(categoryData);
        setItems(itemData);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    saveToLocal("shopping-list", activeShoppingList);
    saveToLocal("recently-used", recentlyUsedItems);
  }, [activeShoppingList, recentlyUsedItems]);

  useEffect(() => {
    saveToLocal("language", language);
  }, [language]);

  return (
    <Wrapper>
      <h1>{language === "en" ? "My shopping list" : "Meine Einkaufsliste"}</h1>
      <button onClick={() => setLanguage("en")}>en</button>
      <button onClick={() => setLanguage("de")}>de</button>
      <ActiveShoppingList
        activeShoppingList={activeShoppingList}
        onToggleActiveItem={deleteItem}
        language={language}
        categories={categories}
      />
      <Search
        onSearch={search}
        language={language}
        searchedItems={searchedItems}
        onAddItem={addItem}
        recentlyUsedItems={recentlyUsedItems}
        onRecentItem={handleRecentItem}
      />
    </Wrapper>
  );

  function search(searchTerm) {
    const searcher = new Searcher(items, {
      keySelector: (obj) => obj.name[language],
    });
    const searchedData = searcher.search(searchTerm);
    console.log(searchedData);
    setSearchedItems(searchedData);
  }

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
    const includesItem = activeShoppingList.some((item) => item._id);

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
  }
}

export default App;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
