import CollabsibleCategory from "./CollabsibleCategory";

export default function ActiveShoppingList({
  activeShoppingList,
  onToggleActiveItem,
}) {
  const categories = [
    ...new Set(activeShoppingList.map((item) => item.category)),
  ];
  return (
    <>
      {categories.map((category) => (
        <CollabsibleCategory
          activeShoppingList={activeShoppingList.filter(
            (item) => item.category === category
          )}
          onToggleActiveItem={onToggleActiveItem}
          key={category}
          category={category}
        />
      ))}
    </>
  );
}
