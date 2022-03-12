import { useState } from "react";
import ShoppingList from "./ShoppingList";
import styled from "styled-components";

export default function CollabsibleCategorie({
  activeShoppingList,
  onToggleActiveItem,
  category,
}) {
  const [toggle, setToggle] = useState(true);
  return (
    <section>
      <Button onClick={() => setToggle(!toggle)}>
        <span>{toggle ? "▹" : "▿"}</span>
        {category}
      </Button>
      {toggle && (
        <ShoppingList
          shoppingList={activeShoppingList}
          onToggleActiveItem={onToggleActiveItem}
        />
      )}
    </section>
  );
}

const Button = styled.button`
  border: none;
  font-size: 1em;
  background-color: white;
  display: flex;
  gap: 8px;

  span {
    width: 12px;
  }
`;
