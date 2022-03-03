import listItems from "./data";
import ListItem from "./components/ListItem";

function App() {
  return (
    <ul>
      {listItems.map((item) => (
        <ListItem key={item._id} name={item.name.en} />
      ))}
    </ul>
  );
}

export default App;
