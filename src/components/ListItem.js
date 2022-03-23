import styled from "styled-components";

export default function ListItem({ item, onToggleActiveItem, language }) {
  return (
    <ListItemStyled onClick={onToggleActiveItem}>
      {item.name[language]}
    </ListItemStyled>
  );
}

const ListItemStyled = styled.li`
  padding: 12px;
  border-radius: 4px;
  background-color: midnightblue;
  color: white;
  list-style: none;
`;
