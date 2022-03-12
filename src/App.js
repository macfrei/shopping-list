import styled from "styled-components";
import { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import SearchItem from "./components/SearchItem";
import { useEffect } from "react";
import { Searcher } from "fast-fuzzy";
import { loadFromLocal, saveToLocal } from "./utils/localStorage";

function App() {
  const [activeShoppingList, setActiveShoppingList] = useState(
    loadFromLocal("shopping-list") ?? []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  const noMatch = searchTerm !== "" && searchedItems.length === 0;

  useEffect(() => {
    loadShoppingItems();
    async function loadShoppingItems() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data = await response.json();
        const searcher = new Searcher(data.data, {
          keySelector: (obj) => obj.name.en,
        });
        const searchedData = searcher.search(searchTerm);
        setSearchedItems(searchedData);
      } catch (error) {
        console.error(error);
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    saveToLocal("shopping-list", activeShoppingList);
  }, [activeShoppingList]);

  return (
    <Wrapper>
      <h1>My shopping list</h1>
      <ShoppingList
        shoppingList={activeShoppingList}
        onToggleActiveItem={deleteItem}
      />
      <SearchItem searchTerm={searchTerm} onSearch={setSearchTerm} />
      {searchedItems && (
        <ShoppingList
          shoppingList={searchedItems}
          onToggleActiveItem={addItem}
        />
      )}
      {noMatch && (
        <p>
          We could not find what you were looking for. For that we are truly
          sorry.
        </p>
      )}
    </Wrapper>
  );

  function deleteItem(clickedItem) {
    const newItemList = activeShoppingList.filter(
      (item) => item._id !== clickedItem._id
    );
    setActiveShoppingList(newItemList);
  }

  function addItem(item) {
    const includesItem = activeShoppingList
      .map((item) => item._id)
      .includes(item._id);
    if (!includesItem) {
      setActiveShoppingList([...activeShoppingList, item]);
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
