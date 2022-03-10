import { nanoid } from "nanoid";
import styled from "styled-components";
import { useState } from "react";
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <Wrapper>
      <h1>My shopping list</h1>
      <ShoppingList shoppingList={shoppingList} onDelete={deleteItem} />
      <AddItem onAddItem={addItem} />
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
