import listItems from "./data";

function App() {
  return (
    <ul>
      {listItems.map((item) => (
        <li key={item._id}>{item.name.en}</li>
      ))}
    </ul>
  );
}

export default App;
