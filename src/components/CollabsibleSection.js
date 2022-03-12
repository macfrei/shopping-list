import { useState } from "react";
import ShoppingList from "./ShoppingList";
import styled from "styled-components";

export default function CollabsibleSection({
  shoppingList,
  onToggleActiveItem,
  title,
  language,
}) {
  const [toggle, setToggle] = useState(true);
  return (
    <section>
      <Button onClick={() => setToggle(!toggle)}>
        <span>{toggle ? "▹" : "▿"}</span>
        {title}
      </Button>
      {toggle && (
        <ShoppingList
          shoppingList={shoppingList}
          onToggleActiveItem={onToggleActiveItem}
          language={language}
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
