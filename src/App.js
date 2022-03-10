import { nanoid } from "nanoid";
import { useState } from "react";
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <>
      <h1>My shopping list</h1>
      <ShoppingList shoppingList={shoppingList} onDelete={deleteItem} />
      <AddItem onAddItem={addItem} />
    </>
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
