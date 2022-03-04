/* eslint-disable jsx-a11y/no-redundant-roles */
import listItems from "./data";
import ListItem from "./components/ListItem";
import { nanoid } from "nanoid";
import { useState } from "react";
import AddItem from "./components/AddItem";

function App() {
  const [shoppingList, setShoppingList] = useState(listItems);

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

  return (
    <>
      <h1>My shopping list</h1>

      <ul role="list">
        {shoppingList.map((item) => (
          <ListItem key={item._id} item={item} onDelete={deleteItem} />
        ))}
      </ul>
      <AddItem onAddItem={addItem} />
    </>
  );
}

export default App;
