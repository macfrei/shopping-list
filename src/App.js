import listItems from "./data";
import ListItem from "./components/ListItem";
import { nanoid } from "nanoid";

function App() {
  function addTodo(title) {
    const newTodo = {
      _id: nanoid(),
      name: { en: title, de: "" },
    };
  }
  return (
    <ul>
      {listItems.map((item) => (
        <ListItem key={item._id} name={item.name.en} />
      ))}
    </ul>
  );
}

export default App;
