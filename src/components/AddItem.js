import { useState } from "react";

export default function AddItem({ onAddItem }) {
  const [item, setItem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(item);
    setItem("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-item">What do you want to buy?</label>
      <input
        type="text"
        id="new-item"
        onChange={(event) => setItem(event.target.value)}
        value={item}
      />
      <button>Add</button>
    </form>
  );
}
