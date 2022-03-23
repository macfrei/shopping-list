import CollabsibleSection from "./CollabsibleSection";

export default function ActiveShoppingList({
  activeShoppingList,
  onToggleActiveItem,
  language,
  categories,
}) {
  return (
    <>
      {categories.map((category) => (
        <CollabsibleSection
          shoppingList={activeShoppingList.filter(
            (item) => item.category._ref === category._id
          )}
          onToggleActiveItem={onToggleActiveItem}
          key={category._id}
          title={category.name[language]}
          language={language}
        />
      ))}
    </>
  );
}
