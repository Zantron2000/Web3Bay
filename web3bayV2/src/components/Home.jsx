import React, { useState } from "react";

import ItemForm from "./ItemForm";
import ItemsList from "./Items";
import SetENS from "./SetENS";

function Home() {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [isCreating, setIsCreating] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const deleteItem = (item) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
    if (newItems.length === 0) {
      setIsCreating(true);
    }
  };

  const addItem = async (item) => {
    if (item.id) {
      const newItems = items.filter((i) => i.id !== item.id);
      setItems([...newItems, item]);
    } else {
      let newId = 1;
      while (items.some((i) => i.id === newId)) {
        newId++;
      }
      item.id = newId;
      setItems([...items, item]);
    }
  };

  const editItem = (item) => {
    setActiveItem(item);
    setIsCreating(true);
  };

  return (
    <div className="Home w-[100%]">
      {isDone ? (
        <SetENS />
      ) : isCreating ? (
        <ItemForm
          addItem={addItem}
          doneCreating={() => setIsCreating(false)}
          itemCount={items.length}
          deleteItem={deleteItem}
          clearEditItem={() => setActiveItem({})}
          editItem={activeItem}
        />
      ) : (
        <ItemsList
          items={items}
          addItem={() => setIsCreating(true)}
          setEditItem={(item) => editItem(item)}
          deleteItem={deleteItem}
          doneCreating={() => setIsDone(true)}
        />
      )}
    </div>
  );
}

export default Home;
