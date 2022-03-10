import styled from "styled-components";

export default function SearchItem({ onSearch, searchTerm }) {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="search">Search for item you want to buy:</label>
      <input
        type="search"
        id="search"
        name="search"
        onChange={(event) => onSearch(event.target.value)}
        value={searchTerm}
      />
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 12px;
  padding: 20px;
`;
