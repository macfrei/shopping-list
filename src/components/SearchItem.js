import styled from "styled-components";

export default function SearchItem({ onSearch, searchTerm, language }) {
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="search">
        {language === "en"
          ? "Search for item you want to buy:"
          : "Suche nach Dingen, die du einkaufen möchtest:"}
      </label>
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
