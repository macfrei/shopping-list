import CollabsibleCategory from "./CollabsibleCategory";

export default function ActiveShoppingList({
  activeShoppingList,
  onToggleActiveItem,
  language,
}) {
  const categories = [
    ...new Set(activeShoppingList.map((item) => item.category[language])),
  ];
  return (
    <>
      {categories.map((category) => (
        <CollabsibleCategory
          activeShoppingList={activeShoppingList.filter(
            (item) => item.category[language] === category
          )}
          onToggleActiveItem={onToggleActiveItem}
          key={category}
          category={category}
          language={language}
        />
      ))}
    </>
  );
}
