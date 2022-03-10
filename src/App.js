import { nanoid } from "nanoid";
import styled from "styled-components";
import { useState } from "react";
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";
import SearchItem from "./components/SearchItem";
import { useEffect } from "react";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    if (searchTerm) loadShoppingItems();
    async function loadShoppingItems() {
      try {
        const response = await fetch(
          "https://fetch-me.vercel.app/api/shopping/items"
        );
        const data = await response.json();
        setSearchedItems(data.data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [searchTerm]);

  return (
    <Wrapper>
      <h1>My shopping list</h1>
      <ShoppingList shoppingList={shoppingList} onDelete={deleteItem} />
      <AddItem onAddItem={addItem} />
      <SearchItem searchTerm={searchTerm} onSearch={setSearchTerm} />
    </Wrapper>
  );

  function addItem(name) {
    const newItem = {
      _id: nanoid(),
      name: { en: name, de: "" },
    };
    setShoppingList([...shoppingList, newItem]);
  }

  function deleteItem(itemId) {
    const newItemList = shoppingList.filter((item) => item._id !== itemId);
    setShoppingList(newItemList);
  }
}

export default App;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
