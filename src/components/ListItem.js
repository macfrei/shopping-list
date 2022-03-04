export default function ListItem({ item, onDelete }) {
  return (
    <li>
      {item.name.en}
      <button onClick={() => onDelete(item._id)}>Delete</button>
    </li>
  );
}
