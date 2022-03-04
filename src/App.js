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

  return (
    <>
      <h1>My shopping list</h1>

      <ul role="list">
        {shoppingList.map((item) => (
          <ListItem key={item._id} name={item.name.en} />
        ))}
      </ul>
      <AddItem onAddItem={addItem} />
    </>
  );
}

export default App;
