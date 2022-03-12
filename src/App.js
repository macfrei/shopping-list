import styled from "styled-components";
import { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import SearchItem from "./components/SearchItem";
import { useEffect } from "react";
import { Searcher } from "fast-fuzzy";
import ListItem from "./components/ListItem";

function App() {
  const [activeShoppingList, setActiveShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

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

  return (
    <Wrapper>
      <h1>My shopping list</h1>
      <ShoppingList shoppingList={activeShoppingList} />
      <SearchItem searchTerm={searchTerm} onSearch={setSearchTerm} />
      {searchedItems && <ShoppingList shoppingList={searchedItems} />}
    </Wrapper>
  );

  function deleteItem(itemId) {
    const newItemList = activeShoppingList.filter(
      (item) => item._id !== itemId
    );
    setActiveShoppingList(newItemList);
  }
}

export default App;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
