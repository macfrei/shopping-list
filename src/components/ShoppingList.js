/* eslint-disable jsx-a11y/no-redundant-roles */
import ListItem from "./ListItem";

export default function ShoppingList({ shoppingList, onDelete }) {
  return (
    <ul role="list">
      {shoppingList.map((item) => (
        <ListItem key={item._id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}
