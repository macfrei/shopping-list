/* eslint-disable jsx-a11y/no-redundant-roles */
import ListItem from "./ListItem";
import styled from "styled-components";

export default function ShoppingList({ shoppingList }) {
  return (
    <List role="list">
      {shoppingList.map((item) => (
        <ListItem key={item._id} item={item} />
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
`;
