import ListItem from "./ListItem";
import styled from "styled-components";

export default function ShoppingList({
  shoppingList,
  onToggleActiveItem,
  language,
}) {
  return (
    <List>
      {shoppingList.map((item) => (
        <ListItem
          key={item._id}
          item={item}
          onToggleActiveItem={() => onToggleActiveItem(item)}
          language={language}
        />
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0;
`;
