import { useState } from "react";
import styled from "styled-components";

export default function AddItem({ onAddItem }) {
  const [item, setItem] = useState("");

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="new-item">What do you want to buy?</label>
      <input
        type="text"
        id="new-item"
        onChange={(event) => setItem(event.target.value)}
        value={item}
        required
      />
      <button>Add</button>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem(item);
    setItem("");
  }
}

const Form = styled.form`
  display: grid;
  gap: 12px;
  padding: 20px;
`;
