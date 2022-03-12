import styled from "styled-components";

export default function ListItem({ item, onToggleActiveItem }) {
  return (
    <ListItemStyled onClick={onToggleActiveItem}>{item.name.en}</ListItemStyled>
  );
}

const ListItemStyled = styled.li`
  padding: 12px;
  border-radius: 4px;
  background-color: midnightblue;
  color: white;
`;
