import { useState } from "react";
import { isValidItem } from "@/utils/itemTools";

const ItemForm = ({
  addItem,
  doneCreating,
  itemCount,
  clearEditItem,
  editItem,
}) => {
  const [badFields, setBadFields] = useState({});
  const [item, setItem] = useState(
    editItem ?? { title: "", price: "", description: "", image: null }
  );

  const setProperty = (key, value) => {
    setItem({ ...item, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, invalidReasons } = isValidItem(item);

    if (isValid) {
      addItem(item);
      setItem(undefined);
      clearEditItem();
      doneCreating();
    } else {
      setBadFields(invalidReasons);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setItem(undefined);
    doneCreating();
  };

  const handleImageChange = (e) => {
    setProperty("image", e.target.files[0]);
  };

  return (
    <div>
      <div className="flex justify-center h-screen">
        <form
          className="flex flex-col justify-start items-start text-white w-1/2 h-[100%]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-start text-white w-[100%] my-2">
            <label htmlFor="title">Title</label>
            <input
              className={`border text-black border-white apperance-none`}
              type="text"
              id="title"
              value={item.title}
              onChange={(e) => setProperty("title", e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-start text-white w-[100%] h-1/6">
            <label htmlFor="price">Price in ETH</label>
            <input
              className={`border border-black text-black w-1/2 ${
                badFields.price ?? "border-black"
              }`}
              type="text"
              id="price"
              value={item.price}
              onChange={(e) => setProperty("price", e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center items-start text-white w-[100%] h-1/6">
            <label htmlFor="description">Description</label>
            <textarea
              className="border-2 border-black text-black w-3/4 h-3/4"
              type="text"
              id="description"
              value={item.description}
              onChange={(e) => setProperty("description", e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-start text-white w-[100%] h-1/6">
            <label htmlFor="image">Image</label>
            <input
              className="border-2 border-black"
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-[100%] h-1/6">
            <button
              className="border-2 border-white text-white w-[100%] h-1/2 rounded-lg hover:bg-white hover:text-black my-8"
              type="submit"
            >
              Submit
            </button>
            {itemCount ? (
              <button
                className="border-2 border-white text-white w-[100%] h-1/2 rounded-lg hover:bg-red hover:text-black"
                onClick={handleCancel}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
        <div className="w-1/2 flex items-center justify-center">
          <div>
            {Object.entries(badFields).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
