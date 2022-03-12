import CollabsibleSection from "./CollabsibleSection";

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
        <CollabsibleSection
          shoppingList={activeShoppingList.filter(
            (item) => item.category[language] === category
          )}
          onToggleActiveItem={onToggleActiveItem}
          key={category}
          title={category}
          language={language}
        />
      ))}
    </>
  );
}
